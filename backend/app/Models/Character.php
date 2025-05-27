<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = ['uid', 'name', 'properties'];

    protected $casts = [
        'properties' => 'array',
    ];

    public function films()
    {
        return $this->belongsToMany(Film::class);
    }
}
