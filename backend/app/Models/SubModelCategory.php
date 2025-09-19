<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubModelCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_category_id',
        'status'
    ];

    protected $casts = [
        'parent_category_id' => 'integer',
        'status' => 'integer'
    ];

    public function sneakers()
    {
        return $this->hasMany(Sneaker::class);
    }

    public function parentCategory()
    {
        return $this->belongsTo(Category::class, 'parent_category_id');
    }

    public function models()
    {
        return $this->hasMany(SneakerModel::class);
    }
}