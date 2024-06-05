<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class PemilikModels extends Authenticatable
{
    use HasApiTokens, Notifiable;

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
