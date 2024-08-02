<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
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

    // public function update(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         // 'name' => 'required|unique:users,name,' . $id,
    //         // 'email' => 'required|unique:users,email,' . $id . '|regex:/(.+)@(.+)\.(.+)/i',
    //         // 'countriesid' => 'required',
    //         // 'statesid' => 'required',
    //         // 'citiesid' => 'required',
    //         'hobbies' => 'required',
    //         'gender' => 'required',
    //         'selectDate' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'message' => false,
    //             'error' => $validator->errors(),
    //             'status' => false,
    //         ], 200);
    //     }

    //     $user = User::find($id);
    //     if (!$user) {
    //         return response()->json([
    //             'message' => 'User not found',
    //             'status' => false,
    //         ], 404);
    //     }

    //     // $user->name = $request->input('name');
    //     // $user->email = $request->input('email');
    //     // $user->countries = $request->input('countriesid');
    //     // $user->states = $request->input('statesid');
    //     // $user->cities = $request->input('citiesid');
    //     $user->hobbies = implode(',', $request->input("hobbies"));
    //     $user->gender = $request->input('gender');

    //     $_stockupdate = Carbon::parse($request["selectDate"])->format('Y-m-d');

    //     $user->date = $_stockupdate;
    //     $user->update();

    //     return response()->json([
    //         'message' => 'User updated successfully.',
    //         'status' => true,
    //         'data' => $user,
    //     ], 201);
    // }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'hobbies' => 'required',
            'gender' => 'required',
            'selectDate' => 'required|date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'status' => false,
            ], 404);
        }

        $user->hobbies = implode(',', $request->input("hobbies"));
        $user->gender = $request->input('gender');
        $user->date = $request->input('selectDate');
        $user->update();

        return response()->json([
            'message' => 'User updated successfully.',
            'status' => true,
            'data' => $user,
        ], 201);
    }

}