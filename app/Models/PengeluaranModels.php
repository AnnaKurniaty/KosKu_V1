<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengeluaranModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pengeluaran';
    protected $primaryKey = 'id_pengeluaran';

    protected $fillable = [
        'id_fasilitas_kamar',
        'id_fasilitas_umum',
        'biaya_pengeluaran',
        'tanggal_pengeluaran',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];

    public function fasilitasKamar()
    {
        return $this->belongsTo(FasilitasKamar::class, 'id_fasilitas_kamar');
    }

    public function fasilitasUmum()
    {
        return $this->belongsTo(FasilitasUmum::class, 'id_fasilitas_umum');
    }
}