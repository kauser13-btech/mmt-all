<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret_key'));
    }

    /**
     * Create a payment intent for Stripe
     */
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.5',
            'customer_email' => 'nullable|email',
            'order_id' => 'nullable|string',
        ]);

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => round($request->amount * 100), // Convert to cents
                'currency' => 'usd',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    'order_id' => $request->order_id ?? 'N/A',
                    'customer_email' => $request->customer_email ?? 'N/A',
                ],
            ]);

            return response()->json([
                'success' => true,
                'client_secret' => $paymentIntent->client_secret,
                'payment_intent_id' => $paymentIntent->id,
            ]);
        } catch (ApiErrorException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirm payment and save order
     */
    public function confirmPayment(Request $request)
    {
        $request->validate([
            'payment_intent_id' => 'required|string',
            'order_data' => 'required|array',
            'order_data.customer' => 'required|array',
            'order_data.items' => 'required|array',
            'order_data.totals' => 'required|array',
        ]);

        try {
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

            if ($paymentIntent->status === 'succeeded') {
                // Save order to database
                $order = DB::transaction(function () use ($request, $paymentIntent) {
                    $orderData = $request->order_data;
                    $customer = $orderData['customer'];
                    $totals = $orderData['totals'];

                    // Create the order
                    $order = Order::create([
                        'order_number' => Order::generateOrderNumber(),
                        'user_id' => auth()->id(), // null if guest
                        'stripe_payment_intent_id' => $paymentIntent->id,
                        'payment_status' => 'succeeded',
                        'amount' => $paymentIntent->amount / 100,
                        'currency' => $paymentIntent->currency,
                        'customer_email' => $customer['email'],
                        'customer_phone' => $customer['phone'] ?? null,
                        'customer_first_name' => $customer['firstName'],
                        'customer_last_name' => $customer['lastName'],
                        'shipping_address' => $customer['address'],
                        'shipping_apartment' => $customer['apartment'] ?? null,
                        'shipping_city' => $customer['city'],
                        'shipping_state' => $customer['state'],
                        'shipping_zip_code' => $customer['zipCode'],
                        'shipping_country' => $customer['country'] ?? 'United States',
                        'subtotal' => $totals['subtotal'],
                        'shipping_cost' => $totals['shipping'],
                        'tax' => $totals['tax'],
                        'total' => $totals['total'],
                        'status' => 'processing',
                    ]);

                    // Create order items
                    foreach ($orderData['items'] as $item) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $item['product_id'] ?? null,
                            'product_name' => $item['title'] ?? $item['name'],
                            'product_description' => $item['description'] ?? null,
                            'product_image' => $item['image'] ?? null,
                            'product_sku' => $item['sku'] ?? null,
                            'size' => $item['size'] ?? null,
                            'color' => $item['color'] ?? null,
                            'unit_price' => $item['price'],
                            'quantity' => $item['quantity'],
                            'total_price' => $item['price'] * $item['quantity'],
                            'custom_design_url' => $item['custom_design_url'] ?? null,
                            'customization_data' => $item['customization'] ?? null,
                        ]);
                    }

                    return $order->load('items');
                });

                return response()->json([
                    'success' => true,
                    'message' => 'Payment confirmed and order saved',
                    'order' => $order,
                    'order_number' => $order->order_number,
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Payment not completed',
            ], 400);
        } catch (ApiErrorException $e) {
            Log::error('Stripe API error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('Order creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to create order: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Stripe webhooks
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        if (!$webhookSecret) {
            return response()->json(['error' => 'Webhook secret not configured'], 500);
        }

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $webhookSecret
            );

            // Handle different event types
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $paymentIntent = $event->data->object;
                    // Handle successful payment
                    \Log::info('Payment succeeded: ' . $paymentIntent->id);
                    break;

                case 'payment_intent.payment_failed':
                    $paymentIntent = $event->data->object;
                    // Handle failed payment
                    \Log::error('Payment failed: ' . $paymentIntent->id);
                    break;

                default:
                    \Log::info('Unhandled event type: ' . $event->type);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get payment details
     */
    public function getPaymentDetails($paymentIntentId)
    {
        try {
            $paymentIntent = PaymentIntent::retrieve($paymentIntentId);

            return response()->json([
                'success' => true,
                'payment_intent' => $paymentIntent,
            ]);
        } catch (ApiErrorException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
