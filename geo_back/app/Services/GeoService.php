<?php

namespace App\Services;

use App\Models\Geolocation;
use App\Models\UserPlan;
use App\Models\UserVehicle;
use Exception;
use Illuminate\Http\Request;

class GeoService
{

    public function save(Request $request)
    {

        $plan = UserPlan::select("id")->where("token", $request->token)->first();
        if (!$plan) {
            throw new Exception("Token inválido!", 401);
        }

        $vehicleId = UserVehicle::select("id")->where("plan_id", $plan->id)->first()->id;

        try {
            $geolocation = new Geolocation();
            $geolocation->id_vehicle = $vehicleId;
            $geolocation->lat = $request->lat;
            $geolocation->lng = $request->lng;
            $geolocation->save();
        } catch (\Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }
}
