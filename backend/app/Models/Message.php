<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    // $table->string('message_status');
    //         $table->string('content');
    //         $table->string('content_type');
    //         $table->unsignedBigInteger('prerent_message_id')->nullable();
    //         $table->unsignedBigInteger('group_chat_session_id')->nullable();
    //         $table->unsignedBigInteger('personal_chat_session_id')->nullable();
    //         $table->unsignedBigInteger('owner_id');
    //         $table->unsignedBigInteger('sender_id');
    protected $fillable = [
        'message_status',
        'content',
        'content_type',
        'prerent_message_id',
        'group_chat_session_id',
        'personal_chat_session_id',
        'owner_id',
        'sender_id',
    ];
}
