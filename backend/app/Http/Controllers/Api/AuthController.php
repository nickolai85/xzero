<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Hash;
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
            return response()->json(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());
        $rs['token'] = $user->createToken('User Access Token')->accessToken;
        $rs['logged_in'] = 'LOGGED_IN';
        return response()->json($rs,200);
    }

    public function signIn (Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response()->json(['errors'=>$validator->errors()->all()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (Hash::check($request->password, $user->password)) {
                $rs['token']  = $user->createToken('User Access Token')->accessToken;
                $rs['logged_in'] = 'LOGGED_IN';
                return response()->json($rs,200);
            } else {
                return response()->json(['message' => 'Wrong password'], 422);
            }

        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

    }

    public function logout (Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        $rs['logged_in'] = 'NOT_LOGGED_IN';
        return response()->json($rs,200);
    }
    public function user(Request $request)
    {
        if ($request->user()){
            $rs['logged_in'] = 'LOGGED_IN';
            $rs['user'] =  $request->user();
        }
        else{

            return $rs['logged_in'] = 'NOT_LOGGED_IN';
        }
        return response()->json($rs,200);
    }
}
