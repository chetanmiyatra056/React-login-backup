<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AllUsersController extends Controller
{
    public function allshow()
    {
        $user = User::get();
        return response()->json($user);
        // return response()->json(["users" => $user], 200);
    }
}
