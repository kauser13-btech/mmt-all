<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'parent_id',
        'type',
        'title',
        'slug',
        'description',
        'asset_id',
        'status'
    ];

    protected $casts = [
        'type' => 'integer',
        'status' => 'integer',
        'parent_id' => 'integer',
        'asset_id' => 'integer'
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
