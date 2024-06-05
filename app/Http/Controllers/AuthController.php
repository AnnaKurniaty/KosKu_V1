<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /* Register API */
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_pemilik' => $request->alamat_pemilik,
            'nomor_telepon' => $request->nomor_telepon,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;


        $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            'status' => 'success',
            'message'=>'User Registered Successfully Verify Your Number',
            'user'=>new UserResource($user),
            'authorisation'=> [
                'token' => $token,
                'type' => 'bearer'
            ]
        ])->withCookie($cookie);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        
        if(!Auth::attempt($data)){
            return response([
                'message' => 'Nomor telepon atau password salah'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'User Login Successfully',
            'user' => new UserResource($user),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    /*User Detail API */
    public function userDetails()
    {
        return response()->json(auth()->user());
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ]);
    }
}