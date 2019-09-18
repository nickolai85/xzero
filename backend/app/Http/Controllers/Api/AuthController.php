<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function signUp (Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());
        $token = $user->createToken('User Access Token')->accessToken;
        $response = ['token' => $token];

        return response($response, 200);
    }

    public function signIn (Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('User Access Token')->accessToken;
                return response()->json(['token' => $token]);
            } else {
                return response()->json(['message' => 'Wrong password'], 422);
            }

        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

    }
}
