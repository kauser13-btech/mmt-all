<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = [
        'title',
        'slug',
        'sku',
        'primary_img_url',
        'base_product_id',
        'type',
        'brand',
        'weight',
        'price',
        'color_name',
        'color_code',
        'material',
        'sneaker_id',
        'description',
        'sneaker_image_url',
        'design_id',
        'user_id',
        'last_updated',
        'mockup_url',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'price' => 'decimal:2',
        'last_updated' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            // Generate unique SKU (12 chars) if not provided
            if (empty($product->sku)) {
                $product->sku = strtoupper(Str::random(12));
            }

            // Generate slug from title if not provided
            if (empty($product->slug) && !empty($product->title)) {
                $product->slug = Str::slug($product->title);
            }
        });
    }

    // Relationships
    public function baseProduct()
    {
        return $this->belongsTo(Product::class, 'base_product_id');
    }

    public function variants()
    {
        return $this->hasMany(Product::class, 'base_product_id');
    }

    public function sneaker()
    {
        return $this->belongsTo(Sneaker::class, 'sneaker_id');
    }

    public function design()
    {
        return $this->belongsTo(Design::class, 'design_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
