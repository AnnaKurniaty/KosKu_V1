<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Twilio\Rest\Client;

class UserController extends Controller
{
    public function showPemilik(User $user)
    {
        return new UserResource($user);
    }

    public function updatePemilik(Request $request, $id)
{
    $request->validate([
        'nama_lengkap' => 'string|max:255',
        'alamat_pemilik' => 'string',
        'nomor_telepon' => 'string|max:15',
        'password' => 'string|min:8|confirmed', 
    ]);

    $user = User::findOrFail($id);
    
    // Siapkan data untuk diupdate
    $data = $request->only(['nama_lengkap', 'alamat_pemilik', 'nomor_telepon', 'password']);
    
    // Enkripsi password jika disediakan
    if (!empty($data['password'])) {
        $data['password'] = bcrypt($data['password']);
    } else {
        unset($data['password']);
    }
    
    // Update user
    $user->update($data);
    
    // Kembalikan response JSON dengan data user yang telah diupdate
    return response()->json(['message' => 'Pemilik berhasil diubah', 'user' => $user]);
}


    public function hapusPemilik(User $user)
    {
        $user->delete();

        return response('',204);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomor_telepon' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('nomor_telepon', $request->nomor_telepon)->first();

        if (!$user) {
            return response()->json(['errors' => ['general' => 'Pengguna tidak ditemukan!']], 404);
        }

        $twilio_sid = env('TWILIO_SID');
        $twilio_token = env('TWILIO_AUTH_TOKEN');
        $twilio_from = env('TWILIO_PHONE_NUMBER');

        $client = new Client($twilio_sid, $twilio_token);

        $verificationCode = rand(100000, 999999);

        // Simpan kode verifikasi di database atau sesi untuk verifikasi selanjutnya
        // Misalnya:
        // $user->verification_code = $verificationCode;
        // $user->save();

        // Kirim SMS verifikasi
        $client->messages->create(
            $user->nomor_telepon,
            [
                'from' => $twilio_from,
                'body' => "Kode verifikasi Anda: $verificationCode"
            ]
        );

        return response()->json(['message' => 'SMS verifikasi telah dikirim']);
    }

    // Method untuk verifikasi pengguna sebelum reset password
    public function verifyUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomor_telepon' => 'required|string|max:15',
            'verification_code' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('nomor_telepon', $request->nomor_telepon)->first();

        if (!$user) {
            return response()->json(['errors' => ['general' => 'Pengguna tidak ditemukan!']], 404);
        }

        // Verifikasi kode yang dimasukkan dengan kode yang disimpan di database atau sesi
        // Misalnya:
        // if ($request->verification_code !== $user->verification_code) {
        //     return response()->json(['errors' => ['verification_code' => 'Kode verifikasi salah']], 422);
        // }

        return response()->json(['userId' => $user->id]);
    }

    // Method untuk reset password
    public function resetPassword(Request $request, $userId)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::findOrFail($userId);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password berhasil diubah', 'user' => $user]);
    }
}