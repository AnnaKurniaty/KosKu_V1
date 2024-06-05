<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\KamarModels as Kamar;
use App\Models\PemasukanModels as Pemasukan;

class PenyewaModels extends Model
{
    use HasFactory;

    protected $table = 'penyewa';
    protected $primaryKey = 'id_penyewa';

    protected $fillable = [
        'id_kamar',
        'nama_lengkap',
        'alamat_penyewa',
        'nomor_telepon',
        'tanggal_mulai_sewa',
        'tanggal_selesai_sewa',
        'status_penyewa',
        'foto_ktp',
    ];

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'id_kamar');
    }

    public function pemasukan()
    {
        return $this->hasMany(Pemasukan::class, 'id_penyewa');
    }
}
