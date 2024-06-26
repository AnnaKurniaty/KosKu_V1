<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function showPemilik(User $user)
    {
        return new UserResource($user);
    }

    public function updatePemilik(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }

    public function hapusPemilik(User $user)
    {
        $user->delete();

        return response('',204);
    }
}