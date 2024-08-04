<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'email' => 'required|unique:users|regex:/(.+)@(.+)\.(.+)/i',
            'password' => 'required|min:4|max:8',
            'confirm_password' => 'required|same:password|min:4|max:8',
            'hobbies' => 'required',
            'gender' => 'required',
            'selectDate' => 'required|date_format:Y-m-d',
            'countriesid' => 'required',
            'statesid' => 'required',
            'citiesid' => 'required',
            'userType' => 'required',
            'file' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = new User;

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->countries = $request->input('countriesid');
        $user->states = $request->input('statesid');
        $user->cities = $request->input('citiesid');

        // $user->hobbies =  $request->input("hobbies");
        $user->hobbies = implode(',', $request->input("hobbies"));

        $user->gender = $request->input('gender');
        $user->date = $request->input('selectDate');
        $user->type = $request->input('userType');

        // Decode and save the file
        $fileData = $request->input('file');
        $fileName = time() . '.png';  // You can dynamically determine the file extension if necessary
        $filePath = public_path('uploads') . '/' . $fileName;
        file_put_contents($filePath, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $fileData)));

        $user->profile = $fileName;

        // $img = time() . '_' . $request->file('file');
        // $request->file('file')->move(public_path('uploads'), $img);

        // $user->profile = $img;

        $user->save();

        return response()->json([
            'message' => 'User registered successfully.',
            'status' => true,
            'type' => 'success',
            'data' => $user,
        ], 201);
    }
}