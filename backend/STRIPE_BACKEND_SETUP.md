# Stripe Backend Integration - Laravel

## Overview
This document outlines the Stripe payment integration on the Laravel backend.

## Installation

The Stripe PHP SDK has been installed:
```bash
composer require stripe/stripe-php
```

## Configuration

### Environment Variables (`.env`)
```env
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=
```

### Services Configuration (`config/services.php`)
```php
'stripe' => [
    'publishable_key' => env('STRIPE_PUBLISHABLE_KEY'),
    'secret_key' => env('STRIPE_SECRET_KEY'),
    'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
],
```

## API Endpoints

### 1. Create Payment Intent
**Endpoint**: `POST /api/payments/create-intent`

**Request Body**:
```json
{
  "amount": 99.99,
  "customer_email": "customer@example.com",
  "order_id": "ORDER-12345"
}
```

**Response**:
```json
{
  "success": true,
  "client_secret": "pi_xxx_secret_xxx",
  "payment_intent_id": "pi_xxx"
}
```

### 2. Confirm Payment
**Endpoint**: `POST /api/payments/confirm`

**Request Body**:
```json
{
  "payment_intent_id": "pi_xxx",
  "order_data": {
    "items": [...],
    "customer": {...},
    "total": 99.99
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Payment confirmed and order saved",
  "payment_intent": {...}
}
```

### 3. Get Payment Details
**Endpoint**: `GET /api/payments/{paymentIntentId}`

**Response**:
```json
{
  "success": true,
  "payment_intent": {
    "id": "pi_xxx",
    "amount": 9999,
    "currency": "usd",
    "status": "succeeded",
    ...
  }
}
```

### 4. Stripe Webhook Handler
**Endpoint**: `POST /api/webhooks/stripe`

Handles Stripe webhook events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## Setting Up Webhooks

1. Go to your Stripe Dashboard: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `http://your-domain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

## Usage in Controllers

### Create Payment Intent
```php
use App\Http\Controllers\Api\PaymentController;

$controller = new PaymentController();
$response = $controller->createPaymentIntent($request);
```

### Retrieve Payment Details
```php
$paymentIntent = \Stripe\PaymentIntent::retrieve('pi_xxx');
```

## Security Considerations

1. **Never expose secret keys** - Keep `STRIPE_SECRET_KEY` secure
2. **Validate webhook signatures** - The webhook handler validates Stripe signatures
3. **Use HTTPS in production** - Required for Stripe webhooks
4. **Verify payment on server** - Always verify payment status server-side

## Testing

Use Stripe's test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 9995`
- 3D Secure: `4000 0025 0000 3155`

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Set up production webhooks
- [ ] Enable production mode in Stripe dashboard
- [ ] Configure webhook secret in production
- [ ] Set up proper error logging
- [ ] Implement order storage in database
- [ ] Add email notifications
- [ ] Configure proper CORS settings

## Error Handling

All endpoints return proper HTTP status codes:
- `200` - Success
- `400` - Bad request / Payment failed
- `404` - Payment not found
- `500` - Server error

## Logging

Payment events are logged:
```php
\Log::info('Payment succeeded: ' . $paymentIntent->id);
\Log::error('Payment failed: ' . $paymentIntent->id);
```

## Next Steps

1. Create database migrations for orders table
2. Implement order model and relationships
3. Add email notifications for successful payments
4. Set up production webhook endpoints
5. Implement refund functionality
6. Add payment receipts generation
