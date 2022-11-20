<?php

namespace App\Http\Controllers;

use App\Services\GeoService;
use Illuminate\Http\Request;

class GeoController extends Controller
{
    public function save(Request $request)
    {
        try {
            $geoService = (new GeoService())->save($request);
            return response($geoService);
        } catch (\Exception $e) {
            return response()->json("Internal server error: ". $e->getMessage(), $e->getCode());
        }
    }
}
