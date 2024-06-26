<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\KebutuhanModels as Kebutuhan;
use App\Models\FasilitasKamarModels as fasilitasKamar;
use App\Models\FasilitasUmumModels as fasilitasUmum;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengeluaranModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pengeluaran';
    protected $primaryKey = 'id_pengeluaran';

    protected $fillable = [
        'id_kebutuhan',
        'biaya_pengeluaran',
        'tanggal_pengeluaran',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];

    public function kebutuhan()
    {
        return $this->belongsTo(Kebutuhan::class, 'id_kebutuhan');
    }

    public function fasilitasKamar()
    {
        return $this->hasMany(fasilitasKamar::class, 'id_fasilitas_kamar');
    }

    public function fasilitasUmum()
    {
        return $this->hasMany(fasilitasUmum::class, 'id_fasilitas_umum');
    }
}