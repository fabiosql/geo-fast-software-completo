<?php

namespace App\Services;

use App\Models\Geolocation;
use App\Models\UserPlan;
use App\Models\UserVehicle;
use DateTime;
use Exception;
use Illuminate\Http\Request;

class VehicleService
{

    public function create(Request $request): void
    {

        $planId = UserPlan::select("id")->where("id", $request->user()->id)->first()->id;
        try {
            $vehicle = new UserVehicle();
            $vehicle->name = $request->name;
            $vehicle->plan_id = $planId;
            $vehicle->save();
        } catch (\Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }

    public function find(Request $request)
    {
        $planId = UserPlan::select("id")->where("id", $request->user()->id)->first()->id;
        return UserVehicle::select("*")->where("plan_id", $planId)->first();
    }

    public function findLocations(Request $request): array
    {
        $planId = UserPlan::select("*")->where("id", $request->user()->id)->first()->id;
        $vehicleId = UserVehicle::select("*")->where("plan_id", $planId)->first()->id;
        $findLocations = Geolocation::select(["lat","lng","created_at"])->where("id_vehicle", $vehicleId)->get();
        $locations = [];
        foreach($findLocations as $key => $location){
            array_push($locations, [
                "lat" => $location->lat,
                "lng" => $location->lng,
                "date" => (new DateTime($location->created_at))->format("H:i:s"),
            ]);
        }
        return $locations;
    }
}
