<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'identifier',
        'title',
        'brand',
        'sku',
        'main_image',
        'slug',
        'description',
        'weight',
        'material',
        'color',
        'status',
        'type',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            // Generate unique identifier (32 chars)
            if (empty($product->identifier)) {
                $product->identifier = Str::random(32);
            }

            // Generate unique SKU (12 chars)
            if (empty($product->sku)) {
                $product->sku = strtoupper(Str::random(12));
            }

            // Generate slug from title
            if (empty($product->slug) && !empty($product->title)) {
                $product->slug = Str::slug($product->title);
            }
        });
    }
}
