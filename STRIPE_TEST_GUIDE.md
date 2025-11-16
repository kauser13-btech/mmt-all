# Stripe Payment Integration - Testing Guide

## Overview
Stripe payment has been successfully integrated into the checkout page in **sandbox/test mode**.

## Configuration
- **Publishable Key**: Set in `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (use your test publishable key)
- **Secret Key**: Set in `.env.local` as `STRIPE_SECRET_KEY` (use your test secret key)
- **Mode**: Test/Sandbox

## Test Credit Card Numbers

Use these test card numbers provided by Stripe:

### Successful Payment
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Payment Requires Authentication (3D Secure)
- **Card Number**: `4000 0025 0000 3155`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

### Declined Card
- **Card Number**: `4000 0000 0000 9995`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

### Insufficient Funds
- **Card Number**: `4000 0000 0000 9995`

## Testing Steps

1. **Add Items to Cart**
   - Navigate to the shop/collection pages
   - Add products to your cart

2. **Go to Checkout**
   - Visit: `http://localhost:3001/checkout`
   - Fill in contact information and shipping address
   - Click "Continue to Payment"

3. **Complete Payment**
   - The Stripe payment form will appear
   - Enter test card details (use 4242 4242 4242 4242)
   - Click the Pay button

4. **Order Confirmation**
   - Upon successful payment, you'll be redirected to the order confirmation page
   - Payment Intent ID will be displayed

## What's Integrated

✅ Stripe Elements for secure card input
✅ Payment Intent API for payment processing
✅ Test mode configuration
✅ Automatic payment validation
✅ Order confirmation page
✅ Error handling and user feedback
✅ Payment metadata (customer email, order details)

## Key Files

### Frontend (Next.js)
- **Checkout Page**: `frontend/src/app/(shop)/checkout/page.jsx`
- **Stripe Payment Form**: `frontend/src/components/stripe/StripePaymentForm.jsx`
- **API Route**: `frontend/src/app/api/stripe/create-payment-intent/route.js`
- **Order Confirmation**: `frontend/src/app/(shop)/order-confirmation/page.jsx`
- **Environment Variables**: `frontend/.env.local`

### Backend (Laravel)
- **Payment Controller**: `backend/app/Http/Controllers/Api/PaymentController.php`
- **API Routes**: `backend/routes/api.php`
- **Stripe Config**: `backend/config/services.php`
- **Environment Variables**: `backend/.env`

### Backend API Endpoints

- `POST /api/payments/create-intent` - Create a payment intent
- `POST /api/payments/confirm` - Confirm payment and save order
- `GET /api/payments/{paymentIntentId}` - Get payment details
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Payment Flow

1. User fills in contact and shipping information
2. User clicks "Continue to Payment"
3. Stripe payment form loads with Payment Intent
4. User enters card details
5. Payment is processed securely through Stripe
6. On success, order data is logged and user redirected
7. Order confirmation page displays payment reference

## Next Steps for Production

When ready to go live:

1. Replace test keys with live keys from Stripe Dashboard
2. Set up webhooks for payment status updates
3. Integrate with your backend to store orders in database
4. Set up email notifications
5. Configure shipping rates and tax calculations
6. Enable production mode in Stripe dashboard

## Monitoring

- View test payments in: https://dashboard.stripe.com/test/payments
- Check logs in browser console for debugging
- Monitor API responses in Network tab

## Support

For Stripe documentation: https://stripe.com/docs
For test cards: https://stripe.com/docs/testing
