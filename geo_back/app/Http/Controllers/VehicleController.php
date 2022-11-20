<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\VehicleService;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function create(Request $request)
    {
        try {
            (new VehicleService())->create($request);
            return response("", 201);
        } catch (\Exception $e) {
            return response()->json("Internal server error " . $e->getMessage(), 500);
        }
    }

    public function find(Request $request)
    {
        try {
            $find = (new VehicleService())->find($request);
            return response($find, 200);
        } catch (\Exception $e) {
            return response()->json("Internal server error " . $e->getMessage(), 500);
        }
    }

    public function location(Request $request)
    {
        try {
            $find = (new VehicleService())->findLocations($request);
            return response($find, 200);
        } catch (\Exception $e) {
            return response()->json("Internal server error " . $e->getMessage(), 500);
        }
    }


}
