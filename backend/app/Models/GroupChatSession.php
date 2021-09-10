<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupChatSession extends Model
{
    use HasFactory;
    protected $fillable = [
        'pin_message_id',
        'group_chat_name'
    ];
}
