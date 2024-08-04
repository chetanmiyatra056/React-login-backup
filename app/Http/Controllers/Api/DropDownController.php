<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cities;
use App\Models\Countries;
use App\Models\States;
use App\Models\User;
use Illuminate\Http\Request;

class DropDownController extends Controller
{
    public function countries()
    {
        $countries = Countries::select(
            'id as countries_id',
            'name as countries_name',
        )->get();

        return response()->json($countries);

        // return response()->json([
        //     'message' => 'Record success found',
        //     'date' => $countries,
        //     'status' => true,
        // ], 200);
    }

    public function country($id)
    {
        return Countries::find($id);
    }
    public function states($id)
    {
        $states = States::select(
            'id as states_id',
            'name as states_name',
            'country_id as countries_id',
        )->where('country_id', $id)
            ->get();

        return response()->json($states);
    }

    public function state($id)
    {
        return States::find($id);
    }

    public function cities($id)
    {
        $cities = Cities::select(
            'id as cities_id',
            'name as cities_name',
            'state_id as states_id',
        )->where('state_id', $id)
            ->get();

        return response()->json($cities);
    }

    public function city($id)
    {
        return Cities::find($id);
    }

    public function dropdown($id)
    {
        $drop = User::select(
                'countries.id as countries_id',
                'countries.name as countries_name',
                'states.id as states_id',
                'states.name as states_name',
                'cities.id as cities_id',
                'cities.name as cities_name',
            )
            ->join('countries', 'users.countries', '=', 'countries.id')
            ->join('states', 'users.states', '=', 'states.id')
            ->join('cities', 'users.cities', '=', 'cities.id')
            ->where('users.id', $id)
            ->first();

            return response()->json($drop);
    }
}
