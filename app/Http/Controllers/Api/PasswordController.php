<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller
{
    public function upassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:4|max:8',
            'new_password' => 'required|min:4|max:8',
            'confirm_password' => 'required|same:new_password|min:4|max:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::find($id);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password does not match!',
                'status' => false,
                'type' => "danger",
                'error' => false,
            ], 200);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'User password changed successfully.',
            'status' => true,
            'type' => "success",
            'data' => $user,
        ], 200);
    }
}
