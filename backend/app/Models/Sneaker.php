<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sneaker extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'original_title',
        'brand_id',
        'sub_model_category_id',
        'model_id',
        'description',
        'image',
        'status',
        'is_feed',
        'sneaker_color',
        'preferred_color',
        'colors'
    ];

    protected $casts = [
        'user_id' => 'integer',
        'brand_id' => 'integer',
        'sub_model_category_id' => 'integer',
        'model_id' => 'integer',
        'image' => 'integer',
        'status' => 'integer',
        'is_feed' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function subModelCategory()
    {
        return $this->belongsTo(SubModelCategory::class);
    }

    public function model()
    {
        return $this->belongsTo(SneakerModel::class, 'model_id');
    }

    public function image()
    {
        return $this->belongsTo(Asset::class, 'image');
    }
}