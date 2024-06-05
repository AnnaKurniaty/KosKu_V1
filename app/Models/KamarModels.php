<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GedungModels as Gedung;
use App\Models\PenyewaModels as Penyewa;
use App\Models\FasilitasKamarModels as FasilitasKamar;

class KamarModels extends Model
{
    use HasFactory;

    protected $table = 'kamar';
    protected $primaryKey = 'id_kamar';

    protected $fillable = [
        'id_gedung',
        'nama_kamar',
        'biaya_kamar',
        'gambar_kamar',
        'status_kamar',
    ];

    public function gedung()
    {
        return $this->belongsTo(Gedung::class, 'id_gedung');
    }

    public function penyewa()
    {
        return $this->hasMany(Penyewa::class, 'id_kamar');
    }

    public function fasilitasKamar()
    {
        return $this->hasMany(FasilitasKamar::class, 'id_kamar');
    }
}
