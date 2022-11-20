<?php

namespace App\Http\Controllers;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function info(Request $request)
    {
        try {
            $userService = (new UserService())->getUserInfoFull($request);
            return response($userService);
        } catch (\Exception $e) {
            return response()->json("Internal server error ". $e->getMessage(), 500);
        }
    }
}
