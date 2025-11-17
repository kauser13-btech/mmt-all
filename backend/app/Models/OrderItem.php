<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_description',
        'product_image',
        'product_sku',
        'size',
        'color',
        'unit_price',
        'quantity',
        'total_price',
        'custom_design_url',
        'customization_data',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'quantity' => 'integer',
        'customization_data' => 'array',
    ];

    /**
     * Get the order that owns the order item
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product that this order item references
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
