<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\ReactController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::get('/test',[TestController::class,'apiindex']);

// Route::get('/users',[UserController::class,'userall']);

// Route::get('/users/{user}',[UserController::class,'show']);

// Route::post('/users',[UserController::class,'store']);

// Route::put('/users/{user}',[UserController::class,'update']);

// Route::delete('/users/{user}',[UserController::class,'destroy']);


// Route::post('/insert',[ReactController::class ,'store']);


// React Login APIs

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);