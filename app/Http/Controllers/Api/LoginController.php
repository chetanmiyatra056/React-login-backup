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
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email not found!',
                'status' => false,
                'type' => 'danger',
                'error' => false,
            ], 200);
        }


        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'message' => 'Password does not match!',
                'status' => false,
                'type' => 'danger',
                'error' => false,
            ], 200);
        }

        return response()->json([
            'message' => 'User login successfully.',
            'status' => true,
            'type' => 'success',
            'data' => $user,
        ], 200);

    }
}
