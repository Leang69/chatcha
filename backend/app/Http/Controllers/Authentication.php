<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailVerifyForgetPassword;
use App\Mail\ForgetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class Authentication extends Controller
{

    /** 
     * @OA\Post(
     * path="/api/signup",
     * tags={"auth"},
     * @OA\RequestBody(
     *       required=true,
     *    @OA\JsonContent(
     *       @OA\Property(property="email", type="string", example="ngounmengleang18@gmail.com"),
     *       @OA\Property(property="username", type="string", example="leang69"),
     *       @OA\Property(property="password", type="string", example="1122334455")
     *    )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success"),
     *      )
     * ),
     * @OA\Response(
     *    response=406,
     *    description="Return when user sign up account with token email",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="email is token"),
     *    )
     * )
     * )
     */
    public function signup(Request $request)
    {
        if (User::where('email', $request->email)->first()) {
            return response()->json(["status" => "email is token"], 406);
        } else {
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
            $token = $user->createToken($user->email)->plainTextToken;
            return response()->json(['token' => $token, "status" => "success"]);
        }
    }


    /** 
     * @OA\Post(
     * path="/api/login",
     * tags={"auth"},
     * @OA\RequestBody(
     *       required=true,
     *    @OA\JsonContent(
     *       @OA\Property(property="email", type="string", example="ngounmengleang18@gmail.com"),
     *       @OA\Property(property="password", type="string", example="1122334455")
     *    )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success"),
     *          @OA\Property(property="token", type="string", example="fha^%^&TUGUJHF@&&T@Gd")
     *      )
     * ),
     * @OA\Response(
     *    response=406,
     *    description="Return when user give a wrong password or email",
     *    @OA\JsonContent(
     *       @OA\Property(property="status", type="string", example="wrong emaill or password")
     *    )
     * )
     * )
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["status" => "wrong emaill or password"], 406);
        }
        $token = $user->createToken($user->email)->plainTextToken;
        return response()->json(['token' => $token, "status" => "success"]);
    }

    /** 
     * @OA\Post(
     * path="/api/change_password",
     * tags={"auth"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     *       required=true,
     *    @OA\JsonContent(
     *       @OA\Property(property="new_password", type="string", example="112245221Zubto"),
     *       @OA\Property(property="old_password", type="string", example="1122334455")
     *    )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success")
     *      )
     * ),
     * @OA\Response(
     *    response=401,
     *    description="Return when user give a wrong bearer token",
     *    @OA\JsonContent(
     *       @OA\Property(property="status", type="string", example="unauthorize")
     *    )
     * ),
     * @OA\Response(
     *    response=406,
     *    description="Return when new password and old password are the same",
     *    @OA\JsonContent(
     *       @OA\Property(property="status", type="string", example="new password and old password are the same.")
     *    )
     * )
     * )
     */
    public function changePassword(Request $request)
    {
        if (Hash::check($request->old_password, $request->user()->password)) {
            if (Hash::check($request->new_password, $request->user()->password)) {
                return response()->json(["status" => "new password and old password are the same."], 406);
            } else {
                $user = User::find($request->user()->id);
                $user->password = Hash::make($request->new_password);
                $user->save();
                return response()->json(["status" => "success"]);
            }
        } else {
            return response()->json(["status" => "password not match"], 406);
        }
    }

    //request a email for verify user.

    /** 
     * @OA\Post(
     * path="/api/forget_password",
     * tags={"auth"},
     * @OA\RequestBody(
     *       required=true,
     *    @OA\JsonContent(
     *       @OA\Property(property="email", type="string", example="ngounmengleang18@gmail.com")
     *    )
     * ),
     * @OA\Response(
     *    response=200,
     *    description="Success",
     *      @OA\JsonContent(
     *          @OA\Property(property="status", type="string", example="success")
     *      )
     * )
     * )
     */

    public function forgetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            SendEmailVerifyForgetPassword::dispatch(
                Mail::to($request->email)->send(new ForgetPassword($user->id))
            ); 
            return response()->json(["status" => "success"]);
        } else {
            return response()->json(["status" => "account dosen't exit"], 406);
        }
    }


    //email for verify user handler.
    public function forgetPasswordHandler(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        } else {
            $user = User::find($request->user);
            $token = $user->createToken($user->email, ['user:restPassword'])->plainTextToken;
            return redirect("http://localhost:3000/reset_password_token/" . $token);
        }
    }
}
