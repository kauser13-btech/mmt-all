<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'user_id',
        'stripe_payment_intent_id',
        'payment_status',
        'amount',
        'currency',
        'customer_email',
        'customer_phone',
        'customer_first_name',
        'customer_last_name',
        'shipping_address',
        'shipping_apartment',
        'shipping_city',
        'shipping_state',
        'shipping_zip_code',
        'shipping_country',
        'subtotal',
        'shipping_cost',
        'tax',
        'total',
        'status',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    /**
     * Generate a unique order number
     */
    public static function generateOrderNumber(): string
    {
        do {
            $orderNumber = 'ORD-' . strtoupper(substr(uniqid(), -8));
        } while (self::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }

    /**
     * Get the user that owns the order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the order items for the order
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the full customer name
     */
    public function getCustomerFullNameAttribute(): string
    {
        return $this->customer_first_name . ' ' . $this->customer_last_name;
    }

    /**
     * Get the full shipping address
     */
    public function getFullShippingAddressAttribute(): string
    {
        $address = $this->shipping_address;
        if ($this->shipping_apartment) {
            $address .= ', ' . $this->shipping_apartment;
        }
        $address .= ', ' . $this->shipping_city . ', ' . $this->shipping_state . ' ' . $this->shipping_zip_code;
        $address .= ', ' . $this->shipping_country;

        return $address;
    }

    /**
     * Scope a query to only include orders for a specific user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include orders with a specific email (for guest orders)
     */
    public function scopeForEmail($query, $email)
    {
        return $query->where('customer_email', $email);
    }

    /**
     * Scope a query to only include pending orders
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include processing orders
     */
    public function scopeProcessing($query)
    {
        return $query->where('status', 'processing');
    }
}
