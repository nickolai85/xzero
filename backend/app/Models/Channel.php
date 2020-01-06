<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use  App\User;

class Channel extends Model
{
    protected $fillable = [
        'created_user', 'joined_user', 'game_id', 'code', 'status'
    ];

    public function gameCreator()
    {
        return $this->belongsTo(User::class, 'created_user');
    }

    public function joinedGame()
    {
        return $this->belongsTo(User::class, 'joined_user');
    }
}
