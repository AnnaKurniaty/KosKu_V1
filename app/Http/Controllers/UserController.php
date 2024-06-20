<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'alamat_pemilik' => 'required|string',
            'nomor_telepon' => 'required|string|max:15|unique:users,nomor_telepon,'.$id,
            'password' => [
                'nullable', // Password can be null (not changed) or required if provided
                Password::min(8)->letters(), // Validate password if provided and meets complexity rules
            ],
        ]);

        // Find the user by ID
        $pemilik = User::find($id);

        // Check if user exists
        if (!$pemilik) {
            return response()->json(['error' => 'Pemilik not found'], 404);
        }

        // Update user data
        $pemilik->nama_lengkap = $request->nama_lengkap;
        $pemilik->alamat_pemilik = $request->alamat_pemilik;
        $pemilik->nomor_telepon = $request->nomor_telepon;

        // Update password only if provided
        if ($request->filled('password')) {
            $pemilik->password = bcrypt($request->password); // Hash the password
        }

        // Save updated user
        $pemilik->save();

        // Return success response
        return response()->json([
            'message' => 'Pemilik berhasil diubah',
            'pemilik' => new UserResource($pemilik),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function hapus($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Pemilik deleted successfully']);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomor_telepon' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $response = Password::sendResetLink(
            $request->only('nomor_telepon')
        );

        if ($response == Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email.']);
        } else {
            return response()->json(['error' => trans($response)], 422);
        }
    }
}