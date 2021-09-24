<?php

use App\Http\Controllers\Authentication;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [Authentication::class, "signup"]);
Route::post('/login', [Authentication::class, "login"]);

Route::post('/forget_password_request', [Authentication::class, "RequestForgetPassword"]);
Route::get('/forget_password/{user}', [Authentication::class, "ForgetPasswordHandler"])->name("forget_password_handler");

//protect route
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/change_password', [Authentication::class, "changePassword"]);
    Route::post('/verify_email_request', [Authentication::class, "RequestEmailVerification"]);
    Route::post('/verify_email_handler', [Authentication::class, "EmailVerificationHandler"]);
});
