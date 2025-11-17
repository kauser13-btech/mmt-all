<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Get all orders for the authenticated user or by email for guests
     */
    public function index(Request $request)
    {
        // If user is authenticated, get their orders
        if (Auth::check()) {
            $orders = Order::with('items')
                ->forUser(Auth::id())
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }
        // If email is provided, get guest orders
        elseif ($request->has('email')) {
            $request->validate([
                'email' => 'required|email',
            ]);

            $orders = Order::with('items')
                ->forEmail($request->email)
                ->whereNull('user_id') // Only guest orders
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required or email must be provided',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'orders' => $orders,
        ]);
    }

    /**
     * Get a single order by order number
     */
    public function show(Request $request, $orderNumber)
    {
        $query = Order::with('items')->where('order_number', $orderNumber);

        // If authenticated, check if order belongs to user
        if (Auth::check()) {
            $query->where(function ($q) {
                $q->forUser(Auth::id())
                  ->orWhere('customer_email', Auth::user()->email);
            });
        }
        // If not authenticated, require email verification
        else {
            if (!$request->has('email')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email required to view order',
                ], 401);
            }

            $request->validate([
                'email' => 'required|email',
            ]);

            $query->where('customer_email', $request->email);
        }

        $order = $query->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'order' => $order,
        ]);
    }

    /**
     * Track order status by order number and email
     */
    public function track(Request $request)
    {
        $request->validate([
            'order_number' => 'required|string',
            'email' => 'required|email',
        ]);

        $order = Order::where('order_number', $request->order_number)
            ->where('customer_email', $request->email)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found. Please check your order number and email.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'order' => [
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total' => $order->total,
                'created_at' => $order->created_at,
                'customer_name' => $order->customer_full_name,
                'shipping_address' => $order->full_shipping_address,
            ],
        ]);
    }

    /**
     * Get order statistics for the authenticated user
     */
    public function statistics()
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required',
            ], 401);
        }

        $userId = Auth::id();

        $stats = [
            'total_orders' => Order::forUser($userId)->count(),
            'total_spent' => Order::forUser($userId)
                ->where('payment_status', 'succeeded')
                ->sum('total'),
            'pending_orders' => Order::forUser($userId)->pending()->count(),
            'processing_orders' => Order::forUser($userId)->processing()->count(),
        ];

        return response()->json([
            'success' => true,
            'statistics' => $stats,
        ]);
    }
}
