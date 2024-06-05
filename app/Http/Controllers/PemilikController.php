<?php

namespace App\Http\Controllers;

use App\Models\PemilikModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class PemilikController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'alamat_pemilik' => 'required|string|max:255',
            'nomor_telepon' => 'required|string|max:15|unique:pemiliks',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $pemilik = Pemilik::create([
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_pemilik' => $request->alamat_pemilik,
            'nomor_telepon' => $request->nomor_telepon,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($pemilik);

        return response()->json(['message' => 'Registrasi berhasil', 'pemilik' => $pemilik]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'nomor_telepon' => 'required|string|max:15',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['nomor_telepon' => $request->nomor_telepon, 'password' => $request->password])) {
            $pemilik = Auth::user();
            $token = $pemilik->createToken('auth_token')->plainTextToken;

            return response()->json(['message' => 'Login berhasil', 'access_token' => $token, 'token_type' => 'Bearer']);
        } else {
            return response()->json(['message' => 'Login gagal, nomor telepon atau password salah'], 401);
        }
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logout berhasil']);
    }
}
