<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\KamarModels as Kamar;
use App\Models\FasilitasModels as Fasilitas;

class FasilitasKamarModels extends Model
{
    use HasFactory;

    protected $table = 'fasilitas_kamar';
    protected $primaryKey = 'id_fasilitas_kamar';

    protected $fillable = [
        'id_kamar',
        'id_fasilitas',
        'biaya_perawatan',
        'tanggal_perawatan',
        'biaya_pembelian',
        'tanggal_pembelian',
    ];

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'id_kamar');
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class, 'id_fasilitas');
    }
}
