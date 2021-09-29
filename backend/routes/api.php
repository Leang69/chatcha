<?php

use App\Http\Controllers\Authentication;
use App\Http\Controllers\Chatting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Auth
Route::post('/signup', [Authentication::class, "signup"]);
Route::post('/login', [Authentication::class, "login"]);

Route::post('/forget_password_request', [Authentication::class, "RequestForgetPassword"]);
Route::get('/forget_password/{user}', [Authentication::class, "ForgetPasswordHandler"])->name("forget_password_handler");

//protect route
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',[Authentication::class, "user"]);
    Route::post('/change_password', [Authentication::class, "changePassword"]);
    Route::post('/verify_email_request', [Authentication::class, "RequestEmailVerification"]);
    Route::post('/verify_email_handler', [Authentication::class, "EmailVerificationHandler"]);
});

//Chatting
Route::middleware('auth:sanctum')->group(function (){
    Route::post('/send_text_message',[Chatting::class,"SendMessage"]);

});
