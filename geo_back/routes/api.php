<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;
use App\Http\Controllers\GeoController;
use \App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);

Route::get("/auth/check", [AuthController::class, "check"])->middleware("auth:sanctum");
Route::get("/user/info", [UserController::class, "info"])->middleware("auth:sanctum");

Route::post("/vehicle", [VehicleController::class, "create"])->middleware("auth:sanctum");
Route::get("/vehicle", [VehicleController::class, "find"])->middleware("auth:sanctum");

Route::get("/vehicle/locations", [VehicleController::class, "location"])->middleware("auth:sanctum");
Route::post("/vehicle/locations/add/{token}", [GeoController::class, "save"]);
