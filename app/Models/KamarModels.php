<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GedungModels as Gedung;
use App\Models\PenyewaModels as Penyewa;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use Illuminate\Database\Eloquent\SoftDeletes;

class KamarModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'kamar';
    protected $primaryKey = 'id_kamar';

    protected $fillable = [
        'id_gedung',
        'nama_kamar',
        'biaya_kamar',
        'gambar_kamar',
        'status_kamar',
    ];

    protected $dates = ['deleted_at'];

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
