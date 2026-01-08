<?php

use App\Http\Controllers\API\Auth\LoginRegisterController;
use App\Http\Controllers\API\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Public routes of authtication
Route::controller(LoginRegisterController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});


// Protected routes of product and logout
// Route::middleware('auth:api')->group(function () {
Route::middleware('check.api.auth')->group(function () {
    Route::post('/logout', [LoginRegisterController::class, 'logout']);
});
Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
Route::post('/store-payment-response', [PaymentController::class, 'storePaymentSuccess']);
