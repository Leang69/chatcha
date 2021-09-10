<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('message_status');
            $table->string('content');
            $table->string('content_type');
            $table->unsignedBigInteger('prerent_message_id')->nullable();
            $table->unsignedBigInteger('group_chat_session_id')->nullable();
            $table->unsignedBigInteger('personal_chat_session_id')->nullable();
            $table->unsignedBigInteger('owner_id');
            $table->unsignedBigInteger('sender_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
