<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Authentication extends Controller
{

    /** 
     * @OA\Post(
     * path="/signup",
     * operationId="authLogout",
     * tags={"auth"},
     * @OA\Response(
     *    response=200,
     *    description="Success"
     *     ),
     * @OA\Response(
     *    response=401,
     *    description="Returns when user is not authenticated",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Not authorized"),
     *    )
     * )
     * )
     */
    public function signup(Request $request)
    {
        
        return response()->json(["name"=>"leangzin"]);
    }
}
