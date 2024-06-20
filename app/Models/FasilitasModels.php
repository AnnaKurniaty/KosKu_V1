<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PengeluaranModels as Pegeluaran;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use Illuminate\Database\Eloquent\SoftDeletes;

class FasilitasModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fasilitas';
    protected $primaryKey = 'id_fasilitas';

    protected $fillable = [
        'nama_fasilitas',
        'jumlah_fasilitas',
        'tanggal_pembelian',
        'biaya_perawatan',
        'tanggal_perawatan',
        'gambar_fasilitas',
        'biaya_pembelian',
    ];

    protected $dates = ['deleted_at'];

    public function fasilitasKamar()
    {
        return $this->hasMany(FasilitasKamar::class, 'id_fasilitas');
    }

    public function fasilitasUmum()
    {
        return $this->hasMany(FasilitasUmum::class, 'id_fasilitas');
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'id_fasilitas');
    }
}
