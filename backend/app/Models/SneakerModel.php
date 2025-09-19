<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SneakerModel extends Model
{
    protected $table = 'models';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'brand_id',
        'sub_model_category_id',
        'model_code',
        'release_date',
        'status'
    ];

    protected $casts = [
        'brand_id' => 'integer',
        'sub_model_category_id' => 'integer',
        'status' => 'integer',
        'release_date' => 'date'
    ];

    public function sneakers()
    {
        return $this->hasMany(Sneaker::class, 'model_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function subModelCategory()
    {
        return $this->belongsTo(SubModelCategory::class);
    }
}