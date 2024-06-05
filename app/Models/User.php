<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasApiTokens;

    protected $fillable = [
        'nama_lengkap',
        'alamat_pemilik',
        'nomor_telepon',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
