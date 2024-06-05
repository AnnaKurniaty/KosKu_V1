<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\KamarModels as Kamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;

class GedungModels extends Model
{
    use HasFactory;

    protected $table = 'gedung';
    protected $primaryKey = 'id_gedung';

    protected $fillable = [
        'id_pemilik',
        'nama_gedung',
        'jumlah_kamar',
        'gambar_gedung',
    ];

    public function pemilik()
    {
        return $this->belongsTo(User::class, 'id_pemilik');
    }

    public function kamar()
    {
        return $this->hasMany(Kamar::class, 'id_gedung');
    }

    public function fasilitasUmum()
    {
        return $this->hasMany(FasilitasUmum::class, 'id_gedung');
    }
}
