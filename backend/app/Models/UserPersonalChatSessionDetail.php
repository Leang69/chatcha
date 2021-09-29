<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPersonalChatSessionDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'personal_chat_session_id'
    ];
}
