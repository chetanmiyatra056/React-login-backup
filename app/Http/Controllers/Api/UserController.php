<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function userall()
    {
        $users = User::all();

        return response()->json($users);
        
        // return response()->json([
        //     'message' => count($users) . ' User found',
        //     'data' => $users,
        //     'status' => true,
        // ]);
    }

    public function show($id)
    {
        $user = User::find($id);

        if ($user != null) {
            return response()->json([
                'message' => 'Record found',
                'date' => $user,
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Record not found',
                'date' => [],
                'status' => true,
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
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

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'User added successfully.',
            'data' => $user,
            'status' => true,
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'message' => 'User not found.',
                'status' => false,
            ], 200);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Please fix the errors.',
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => $user,
            'status' => true,
        ], 200);
    }

    public function destroy(Request $request,$id){
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'message' => 'User not found.',
                'status' => false,
            ], 200);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
            'status' => true,
        ], 200);

    }
}
