<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = ['uid', 'title', 'properties'];

    protected $casts = [
        'properties' => 'array',
    ];

    public function characters()
    {
        return $this->belongsToMany(Character::class);
    }
}
