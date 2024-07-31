<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // Import the Auth facade

class PasswordController extends Controller
{
    public function upassword(Request $request, $id)
    {
        // Validate the input
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:4|max:8',
            'password' => 'required|min:4|max:8',
            'confirm_password' => 'required|same:password|min:4|max:8'
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        // Get the authenticated user
        $user = User::find($id);

        // Check if the current password matches
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Password does not match!',
                'status' => false,
                'error' => false,
            ], 200);
        }

        // Update the user's password
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'User password changed successfully.',
            'status' => true,
            'data' => $user,
        ], 200);
    }
}