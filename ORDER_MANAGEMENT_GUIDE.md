# Order Management System - Complete Guide

## Overview
Complete order management system integrated with Stripe payments. Orders are now saved to the database and users can view their order history.

---

## Database Schema

### Orders Table
Stores complete order information including payment details, customer information, and shipping address.

**Fields:**
- `id` - Primary key
- `order_number` - Unique order identifier (format: ORD-XXXXXXXX)
- `user_id` - Foreign key to users (nullable for guest orders)
- `stripe_payment_intent_id` - Stripe payment reference
- `payment_status` - Payment status (pending, succeeded, failed, refunded)
- `amount` - Total payment amount
- `currency` - Currency code (default: usd)
- `customer_email` - Customer email address
- `customer_phone` - Customer phone number
- `customer_first_name` - Customer first name
- `customer_last_name` - Customer last name
- `shipping_address` - Street address
- `shipping_apartment` - Apartment/suite number
- `shipping_city` - City
- `shipping_state` - State
- `shipping_zip_code` - ZIP code
- `shipping_country` - Country (default: United States)
- `subtotal` - Cart subtotal
- `shipping_cost` - Shipping cost
- `tax` - Tax amount
- `total` - Total amount
- `status` - Order status (pending, processing, shipped, delivered, cancelled)
- `notes` - Order notes
- `created_at`, `updated_at`, `deleted_at`

### Order Items Table
Stores individual items in each order with product snapshot at time of purchase.

**Fields:**
- `id` - Primary key
- `order_id` - Foreign key to orders
- `product_id` - Foreign key to products (nullable)
- `product_name` - Product name snapshot
- `product_description` - Product description snapshot
- `product_image` - Product image URL
- `product_sku` - Product SKU
- `size` - Selected size
- `color` - Selected color
- `unit_price` - Price per unit
- `quantity` - Quantity ordered
- `total_price` - Line item total
- `custom_design_url` - Custom design URL (if applicable)
- `customization_data` - Additional customization data (JSON)
- `created_at`, `updated_at`

---

## Backend Implementation

### Models

#### Order Model
**Location:** `backend/app/Models/Order.php`

**Key Methods:**
- `generateOrderNumber()` - Generates unique order numbers
- `user()` - Relationship to User model
- `items()` - Relationship to OrderItem model
- `getCustomerFullNameAttribute()` - Accessor for full customer name
- `getFullShippingAddressAttribute()` - Accessor for formatted shipping address
- `scopeForUser()` - Scope for user-specific orders
- `scopeForEmail()` - Scope for guest order lookups
- `scopePending()` - Scope for pending orders
- `scopeProcessing()` - Scope for processing orders

#### OrderItem Model
**Location:** `backend/app/Models/OrderItem.php`

**Relationships:**
- `order()` - Belongs to Order
- `product()` - Belongs to Product

### Controllers

#### PaymentController (Updated)
**Location:** `backend/app/Http/Controllers/Api/PaymentController.php`

**Updated Method:**
- `confirmPayment()` - Now saves orders to database after successful payment
  - Creates Order record
  - Creates OrderItem records for each cart item
  - Returns order number for confirmation

#### OrderController (New)
**Location:** `backend/app/Http/Controllers/OrderController.php`

**Methods:**
- `index()` - Get all orders for authenticated user or by email
- `show($orderNumber)` - Get single order by order number
- `track()` - Track order status by order number and email
- `statistics()` - Get order statistics for authenticated user

### API Routes

**Public Routes** (Guest accessible):
```
POST   /api/orders/track              - Track order by number and email
GET    /api/orders/{orderNumber}      - Get order details
POST   /api/payments/confirm          - Confirm payment and save order
```

**Authenticated Routes** (Login required):
```
GET    /api/orders                    - List user's orders
GET    /api/orders/statistics         - Get user order statistics
```

---

## Frontend Implementation

### Updated Components

#### Checkout Page
**Location:** `frontend/src/app/(shop)/checkout/page.jsx`

**Changes:**
- `handlePaymentSuccess()` - Now calls `/api/payments/confirm` to save order
- Sends complete order data including customer info, items, and totals
- Redirects to confirmation page with order_number instead of payment_intent
- Displays payment ID in error message for support reference

#### Order Confirmation Page
**Location:** `frontend/src/app/(shop)/order-confirmation/page.jsx`

**Changes:**
- Fetches order details by order_number
- Displays order information:
  - Order number
  - Total amount
  - Order status
  - Customer email
- Loading states while fetching order data

---

## Payment & Order Flow

### Complete Flow

1. **User adds items to cart**
2. **User navigates to checkout**
3. **User fills contact and shipping information**
4. **User clicks "Continue to Payment"**
5. **Stripe Payment Intent created** (via `/api/stripe/create-payment-intent`)
6. **Stripe payment form loads**
7. **User enters card details and submits**
8. **Stripe processes payment**
9. **On payment success:**
   - Frontend calls `/api/payments/confirm` with:
     - Payment Intent ID
     - Customer information
     - Cart items
     - Order totals
   - Backend creates Order and OrderItem records
   - Returns order number
10. **User redirected to confirmation page**
11. **Confirmation page displays order details**
12. **Cart is cleared**

### Order Data Structure Sent to Backend

```javascript
{
  "payment_intent_id": "pi_xxx",
  "order_data": {
    "customer": {
      "email": "customer@example.com",
      "phone": "555-1234",
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St",
      "apartment": "Apt 4",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "United States"
    },
    "items": [
      {
        "product_id": 1,
        "title": "T-Shirt",
        "description": "Cool t-shirt",
        "image": "/images/tshirt.jpg",
        "sku": "TS-001",
        "size": "M",
        "color": "Blue",
        "price": 29.99,
        "quantity": 2
      }
    ],
    "totals": {
      "subtotal": 59.98,
      "shipping": 9.99,
      "tax": 5.60,
      "total": 75.57
    }
  }
}
```

---

## API Response Examples

### Create Order Success Response
```json
{
  "success": true,
  "message": "Payment confirmed and order saved",
  "order": {
    "id": 1,
    "order_number": "ORD-ABC12345",
    "total": "75.57",
    "status": "processing",
    "payment_status": "succeeded",
    ...
  },
  "order_number": "ORD-ABC12345"
}
```

### Get Order Response
```json
{
  "success": true,
  "order": {
    "id": 1,
    "order_number": "ORD-ABC12345",
    "customer_email": "customer@example.com",
    "customer_first_name": "John",
    "customer_last_name": "Doe",
    "total": "75.57",
    "status": "processing",
    "payment_status": "succeeded",
    "items": [
      {
        "id": 1,
        "product_name": "T-Shirt",
        "size": "M",
        "color": "Blue",
        "unit_price": "29.99",
        "quantity": 2,
        "total_price": "59.98"
      }
    ]
  }
}
```

### Track Order Response
```json
{
  "success": true,
  "order": {
    "order_number": "ORD-ABC12345",
    "status": "processing",
    "payment_status": "succeeded",
    "total": "75.57",
    "created_at": "2025-11-17T12:00:00.000000Z",
    "customer_name": "John Doe",
    "shipping_address": "123 Main St, Apt 4, New York, NY 10001, United States"
  }
}
```

---

## Features Implemented

✅ Complete order database schema
✅ Order and OrderItem models with relationships
✅ Automatic order number generation
✅ Payment confirmation with order creation
✅ Order history for authenticated users
✅ Guest order tracking by email
✅ Order detail view
✅ Order status tracking
✅ Product snapshot at time of order
✅ Shipping and tax calculation storage
✅ Soft deletes for order records
✅ Transaction-based order creation
✅ Error handling and logging

---

## Testing the System

### Test Order Creation

1. Start Docker containers (if not running)
2. Run migrations to create tables
3. Add items to cart
4. Go to checkout
5. Fill in customer information
6. Complete payment with test card: `4242 4242 4242 4242`
7. Verify order is saved in database
8. Check order confirmation page displays order details

### Verify in Database

```sql
-- Check orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;

-- Check order items
SELECT * FROM order_items WHERE order_id = 1;

-- Check order with items
SELECT o.*, oi.* FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.order_number = 'ORD-ABC12345';
```

### Test API Endpoints

```bash
# Track order (guest)
curl -X POST http://localhost/api/orders/track \
  -H "Content-Type: application/json" \
  -d '{"order_number":"ORD-ABC12345","email":"customer@example.com"}'

# Get order details
curl http://localhost/api/orders/ORD-ABC12345?email=customer@example.com

# Get user orders (authenticated)
curl http://localhost/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Database Migration

**IMPORTANT:** Before testing, you must run the migrations:

```bash
# Run migrations
docker compose exec app php artisan migrate

# Or if migrations fail, refresh database (CAUTION: Deletes all data)
docker compose exec app php artisan migrate:fresh
```

---

## Next Steps

### Recommended Enhancements

1. **Email Notifications**
   - Send order confirmation emails
   - Send shipping notifications
   - Send delivery confirmations

2. **Admin Order Management**
   - Admin dashboard for viewing all orders
   - Update order status
   - Print invoices/receipts
   - Bulk order operations

3. **User Account Features**
   - Order history page in user dashboard
   - Reorder functionality
   - Order tracking timeline
   - Download receipts

4. **Advanced Features**
   - Order cancellation
   - Return/refund management
   - Order notes and comments
   - Shipment tracking integration

5. **Analytics**
   - Sales reports
   - Revenue tracking
   - Popular products
   - Customer insights

---

## Support

For issues or questions:
- Check database tables exist: `SHOW TABLES;`
- Verify migrations ran: `SELECT * FROM migrations;`
- Check Laravel logs: `backend/storage/logs/laravel.log`
- Check browser console for frontend errors
