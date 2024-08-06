<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    // public function search($key)
    // {
    //     $user = User::where('users.name', 'LIKE', "$key%")
    //         ->orWhere('users.email', 'LIKE', "$key%")
    //         ->orWhere('countries.name', 'LIKE', "$key%")
    //         ->orWhere('states.name', 'LIKE', "$key%")
    //         ->orWhere('cities.name', 'LIKE', "$key%")

    //         // ->whereDate('users.date', '>=', $key)
    //         // ->whereDate('users.date', '<=', $key)

    //         ->leftJoin('countries', 'users.countries', '=', 'countries.id')
    //         ->leftJoin('states', 'users.states', '=', 'states.id')
    //         ->leftJoin('cities', 'users.cities', '=', 'cities.id')
    //         ->select(
    //             'users.name as users_name',
    //             'email',
    //             'countries.name as countries_name',
    //             'states.name as states_name',
    //             'cities.name as cities_name',
    //             'hobbies',
    //             'gender',
    //             'date',
    //             'type',
    //             'profile',
    //         )
    //         ->get();

    //     return response()->json($user);
    // }

    public function search(Request $request)
    {
        $key = $request->input('key');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $query = User::leftJoin('countries', 'users.countries', '=', 'countries.id')
            ->leftJoin('states', 'users.states', '=', 'states.id')
            ->leftJoin('cities', 'users.cities', '=', 'cities.id')
            ->select(
                'users.name as users_name',
                'email',
                'countries.name as countries_name',
                'states.name as states_name',
                'cities.name as cities_name',
                'hobbies',
                'gender',
                'date',
                'type',
                'profile'
            );

        if ($key) {
            $query->where('users.name', 'LIKE', "$key%")
                ->orWhere('users.email', 'LIKE', "$key%")
                ->orWhere('countries.name', 'LIKE', "$key%")
                ->orWhere('states.name', 'LIKE', "$key%")
                ->orWhere('cities.name', 'LIKE', "$key%");
        }

        if ($startDate) {
            $query->whereDate('users.date', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('users.date', '<=', $endDate);
        }

        $users = $query->get();

        return response()->json($users);
    }

}
