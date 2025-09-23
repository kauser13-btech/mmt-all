<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpecificColor extends Model
{
    protected $fillable = [
        'sneaker_id',
        'color_name',
        'color_code',
        'color_sequence'
    ];

    protected $casts = [
        'sneaker_id' => 'integer',
        'color_sequence' => 'json'
    ];

    public function sneaker()
    {
        return $this->belongsTo(Sneaker::class);
    }
}
