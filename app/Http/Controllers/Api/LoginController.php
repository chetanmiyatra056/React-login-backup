<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Please fix the errors.',
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'message' => 'User logged in successfully.',
                'status' => true,
                'data' => $user,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Invalid email or password.',
                'status' => false,
                'error' => [
                    'email' => ['Invalid email or password.'],
                    'password' => ['Invalid email or password.'],
                ],
            ], 200);
        }
    }
}