<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use App\Models\PengeluaranModels as Pengeluaran;
use Illuminate\Database\Eloquent\SoftDeletes;

class KebutuhanModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'kebutuhan';
    protected $primaryKey = 'id_kebutuhan';

    protected $fillable = [
        'id_fasilitas_umum',
        'id_fasilitas_kamar',
        'tanggal_pembelian',
        'biaya_perbaikan',
        'tanggal_perbaikan',
        'biaya_pembelian',
    ];

    protected $dates = ['deleted_at'];

    public function fasilitasKamar()
    {
        return $this->hasMany(FasilitasKamar::class, 'id_fasilitas_kamar');
    }

    public function fasilitasUmum()
    {
        return $this->hasMany(FasilitasUmum::class, 'id_fasilitas_umum');
    }
}
