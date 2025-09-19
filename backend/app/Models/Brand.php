<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'website',
        'status'
    ];

    protected $casts = [
        'status' => 'integer'
    ];

    public function sneakers()
    {
        return $this->hasMany(Sneaker::class);
    }

    public function models()
    {
        return $this->hasMany(SneakerModel::class);
    }
}