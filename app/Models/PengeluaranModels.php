<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;

class PengeluaranModels extends Model
{
    use HasFactory;

    protected $table = 'pengeluaran';
    protected $primaryKey = 'id_pengeluaran';

    protected $fillable = [
        'id_fasilitas_kamar',
        'id_fasilitas_umum',
        'biaya_pengeluaran',
        'tanggal_pengeluaran',
        'keterangan',
    ];

    // Relationship with FasilitasKamar
    public function fasilitasKamar()
    {
        return $this->belongsTo(FasilitasKamar::class, 'id_fasilitas_kamar');
    }

    // Relationship with FasilitasUmum
    public function fasilitasUmum()
    {
        return $this->belongsTo(FasilitasUmum::class, 'id_fasilitas_umum');
    }
}