<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AllUsersController extends Controller
{
    public function allshow()
    {
        // $user = User::get();

        $user = User::select(
            'users.name as users_name',
            'email',
            'countries.name as countries_name',
            'states.name as states_name',
            'cities.name as cities_name',
            'hobbies',
            'gender',
            'date',
            'type',
            'profile',
        )
            ->join('countries', 'users.countries', '=', 'countries.id')
            ->join('states', 'users.states', '=', 'states.id')
            ->join('cities', 'users.cities', '=', 'cities.id')
            ->get();



        return response()->json($user);
        // return response()->json(["users" => $user], 200);
    }
}