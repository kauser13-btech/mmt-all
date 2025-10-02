<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignTag extends Model
{
    protected $fillable = [
        'design_id',
        'tag'
    ];

    protected $casts = [
        'design_id' => 'integer'
    ];

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function scopeByTag($query, $tag)
    {
        return $query->where('tag', $tag);
    }
}
