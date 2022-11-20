<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthController extends Controller
{

    public function index()
    {
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        try {

            $token = $request->bearerToken();

            if (!$token) {
                throw new \ErrorException("Invalid credentials header");
            }

            return response(["data" => $request->user()->id, "token" => $token]);
        } catch (\Exception $e) {
            return response(["data" => "Internal server error: " . $e->getMessage()], 500);
        }
    }


    /**
     * Create new user
     *
     * @param \Illuminate\Http\Request $request
     */
    public function register(Request $request)
    {


        $findUser = User::select("id", "full_name")->where("email", $request->email)->first();

        if(!empty($findUser)){
            return response(["error" => "Ooops! Já existe um usuário com esse e-mail"], 401);
        }

        $user = new User();
        $user->full_name = $request->full_name;
        $user->email = $request->email;
        $user->plan_id = $request->plan_id;
        $user->status = "active";
        $user->password = bcrypt($request->password);
        $user->save();

        $idUser = $user->id;

        $userPlan = new UserPlan();
        $userPlan->id_user = $idUser;
        $userPlan->id_plan = $request->plan_id;
        $userPlan->status = "active";
        $userPlan->token = Uuid::uuid4()->toString();
        $userPlan->save();

        $tokenName = [
            "user" => $idUser,
            "user-agent" => $request->header("User-Agent"),
            "ip" => $request->ip()
        ];

        $token = $user->createToken(http_build_query($tokenName))->plainTextToken;

        $user->update();

        $findUser = User::select("id", "full_name")->where("id", $idUser)->first();

        $response = [
            "user" => $findUser,
            "token" => $token
        ];

        if (!$findUser) {
            return response(["error" => "Houve um problema ao criar sua conta, atualize e tente novamente!"], 401);
        }
        return response($response, 201);
    }

    /**
     * Login user
     *
     * @param \Illuminate\Http\Request $request
     */
    public function login(Request $request)
    {

        $email = filter_var($request->email, FILTER_VALIDATE_EMAIL);

        $user = User::select("id", "email", "full_name", "password")
            ->where("email", $email)->first();

        if (!$email || !$user) {
            return response(["error" => "E-mail e/ou senha incorretos. Tente novamente ou recupere o acesso!"], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response(["error" => "E-mail e/ou senha incorretos. Tente novamente ou recupere o acesso!"], 401);
        }

        foreach ($user->tokens as $token) {
            $user->tokens()->where('id', $token->id)->delete();
        }

        $tokenName = [
            "user" => $user->id,
            "user-agent" => $request->header("User-Agent"),
            "ip" => $request->ip()
        ];

        $token = $user->createToken(http_build_query($tokenName))->plainTextToken;

        $response = [
            "token" => $token
        ];

        return response($response, 200);
    }

}
