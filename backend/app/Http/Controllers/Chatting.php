<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\PersonalChatSession;
use App\Models\PersonalSession;
use App\Models\UserPersonalChatSessionDetail;
use App\Models\UserPersonalSessionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Chatting extends Controller
{

    private function GetChatSessionID($senderID, $receiverID)
    {
        return DB::select("
        SELECT personal_chat_session_id
        FROM user_personal_chat_session_details
        WHERE user_id = ? AND personal_chat_session_id in (
            SELECT personal_chat_session_id 
            FROM user_personal_chat_session_details
            WHERE user_id = ?
        )
        LIMIT 1
    ", [$senderID, $receiverID]);
    }

    /** 
     * @OA\Post(
     * path="/api/send_text_message",
     * tags={"chatting"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     *      required=true,
     *  @OA\JsonContent(  
     *       @OA\Property(property="receiverID", type="string", example="2"),
     *       @OA\Property(property="messageContent", type="string", example="Helllo")
     * )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success"),
     *      )
     * )
     * )
     */
    public function SendMessage(Request $request)
    {
        $sessionID = $this->GetChatSessionID($request->user()->id, $request->receiverID);

        if (!$sessionID) {
            $sessionID = new PersonalChatSession();
            $sessionID->save();
            UserPersonalChatSessionDetail::create([
                'user_id' => $request->user()->id,
                'personal_chat_session_id' => $sessionID->id
            ]);
            UserPersonalChatSessionDetail::create([
                'user_id' => $request->receiverID,
                'personal_chat_session_id' => $sessionID->id
            ]);
            $sessionID = $sessionID->id;
        } else {
            $sessionID = $sessionID[0]->personal_chat_session_id;
        }

        Message::create([
            'message_status' => 'sended',
            'content' => $request->messageContent,
            'content_type' => "text",
            'personal_chat_session_id' => $sessionID,
            'owner_id' => $request->user()->id,
            'sender_id' => $request->user()->id,
        ]);

        return response()->json(["message" => "success"]);
    }

    /** 
     * @OA\Post(
     * path="/api/get_all_message",
     * tags={"chatting"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     *      required=true,
     *  @OA\JsonContent(  
     *       @OA\Property(property="receiverID", type="string", example="2")
     * )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success"),
     *      )
     * )
     * )
     */
    public function GetAllMessage(Request $request)
    {
        $sessionID = $this->GetChatSessionID($request->user()->id, $request->receiverID);
        return response()->json(Message::where("personal_chat_session_id", $sessionID[0]->personal_chat_session_id)->get());
    }

    /** 
     * @OA\Post(
     * path="/api/get_last_message",
     * tags={"chatting"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     *      required=true,
     *  @OA\JsonContent(  
     *       @OA\Property(property="receiverID", type="string", example="2")
     * )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success"),
     *      )
     * )
     * )
     */
    public function GetLastMessage(Request $request)
    {
        $sessionID = $this->GetChatSessionID($request->user()->id, $request->receiverID);
        return response()->json(
            Message::where("personal_chat_session_id", $sessionID[0]->personal_chat_session_id)
                ->orderByDesc('created_at')
                ->limit(1)
                ->get()
        );
    }
}
