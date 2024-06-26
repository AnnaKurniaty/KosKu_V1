<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\MenyewaModels as Menyewa;

class PenyewaModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'penyewa';
    protected $primaryKey = 'id_penyewa';

    protected $fillable = [
        'nama_lengkap',
        'alamat_penyewa',
        'nomor_telepon',
        'no_pj_penyewa',
        'status_penyewa',
        'foto_ktp',
    ];

    protected $dates = ['deleted_at'];
}
