<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUserPersonalChatSessionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_personal_chat_session_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("personal_chat_session_id");
            $table->string("neckname")->nullable();
            $table->timestamps();
        });

        //user send message
        DB::statement("ALTER TABLE messages 
                    ADD FOREIGN KEY (owner_id) REFERENCES users(id);");

        //user attend user_personal_chart_session_detail
        DB::statement("ALTER TABLE user_personal_chat_session_details 
                    ADD FOREIGN KEY (user_id) REFERENCES users(id);");

        //user_personal_chart_session_detail contain personal_chat_session
        DB::statement("ALTER TABLE user_personal_chat_session_details 
                    ADD FOREIGN KEY (personal_chat_session_id) REFERENCES personal_chat_sessions(id);");

        //user attend user_group_chat_session_details
        DB::statement("ALTER TABLE user_group_chat_session_details 
                    ADD FOREIGN KEY (user_id) REFERENCES users(id);");

        //user_group_chat_session_details contain group_chat_session
        DB::statement("ALTER TABLE user_group_chat_session_details 
                    ADD FOREIGN KEY (group_chat_session_id) REFERENCES group_chat_sessions(id);");

        //message is store at group chat session
        DB::statement("ALTER TABLE messages 
                    ADD FOREIGN KEY (group_chat_session_id) REFERENCES group_chat_sessions(id);");

        //message is store at personal chat session
        DB::statement("ALTER TABLE messages 
                    ADD FOREIGN KEY (personal_chat_session_id) REFERENCES personal_chat_sessions(id);");

        //message is pin on user_group_chat_session_details
        DB::statement("ALTER TABLE group_chat_sessions 
                    ADD FOREIGN KEY (pin_message_id) REFERENCES messages(id);");

        //message is pin on user_personal_chart_session_detail
        DB::statement("ALTER TABLE personal_chat_sessions 
                    ADD FOREIGN KEY (pin_message_id) REFERENCES messages(id);");

        //message is perent of message
        DB::statement("ALTER TABLE messages 
                    ADD FOREIGN KEY (prerent_message_id) REFERENCES messages(id);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_personal_chat_session_details');
    }
}
