<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'svg',
        'description',
        'status',
        'is_chosen',
        'is_featured',
        'is_feed'
    ];

    protected $casts = [
        'user_id' => 'integer',
        'category_id' => 'integer',
        'status' => 'integer',
        'is_chosen' => 'boolean',
        'is_featured' => 'boolean',
        'is_feed' => 'boolean'
    ];

    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->hasMany(DesignTag::class);
    }

    public function isActive()
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeChosen($query)
    {
        return $query->where('is_chosen', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeFeed($query)
    {
        return $query->where('is_feed', true);
    }
}
