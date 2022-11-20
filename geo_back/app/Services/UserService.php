<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;

class UserService
{

    public function getUserInfoFull(Request $request): array
    {
        $user = $request->user();
        return [
            "id" => $user->id,
            "email" => $user->email,
            "full_name" => $user->full_name
        ];
    }

}
