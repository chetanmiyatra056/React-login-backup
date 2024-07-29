<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateController extends Controller
{
    public function getuser($id)
    {
        return User::find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'email' => 'required|unique:users|regex:/(.+)@(.+)\.(.+)/i',
            'countriesid' => 'required',
            'statesid' => 'required',
            'citiesid' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::find($id);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->countries = $request->input('countriesid');
        $user->states = $request->input('statesid');
        $user->cities = $request->input('citiesid');
        $user->update();

        return response()->json([
            'message' => 'User updated successfully.',
            'status' => true,
            'data' => $user,
        ], 201);
    }
}
