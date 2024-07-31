<?php

use App\Http\Controllers\Api\DropDownController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\ReactController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UpdateController;
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

Route::get('/user/{user}', [UpdateController::class, 'getuser']);

Route::post('/update/{user}', [UpdateController::class, 'update']);

Route::post('/password/{user}', [PasswordController::class, 'upassword']);


// Countries, States and Cities DropDown Apis

Route::get('/countries', [DropDownController::class, 'countries']);

Route::get('/states/{states}', [DropDownController::class, 'states']);

Route::get('/cities/{cities}', [DropDownController::class, 'cities']);


// Edit Countries, States and Cities DropDown Apis

Route::get('/dropdown/{id}', [DropDownController::class, 'dropdown']);

Route::get('/country/{id}', [DropDownController::class, 'country']);

Route::get('/state/{id}', [DropDownController::class, 'state']);

Route::get('/city/{id}', [DropDownController::class, 'city']);