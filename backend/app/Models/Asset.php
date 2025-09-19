<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = [
        'user_id',
        'asset_name',
        'asset_url',
        'status',
        'storage_type'
    ];

    protected $casts = [
        'user_id' => 'integer',
        'status' => 'integer',
        'storage_type' => 'integer'
    ];

    const STORAGE_S3 = 1;
    const STORAGE_LOCAL = 2;

    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sneakers()
    {
        return $this->hasMany(Sneaker::class, 'image');
    }

    public function categories()
    {
        return $this->hasMany(Category::class, 'asset_id');
    }

    public function getFullUrlAttribute()
    {
        return $this->asset_url ? url($this->asset_url) : null;
    }

    public function getStorageTypeNameAttribute()
    {
        return $this->storage_type === self::STORAGE_S3 ? 'S3' : 'Local';
    }

    public function isActive()
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeByStorageType($query, $type)
    {
        return $query->where('storage_type', $type);
    }
}