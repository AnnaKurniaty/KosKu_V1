<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\KamarModels as Kamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use Illuminate\Database\Eloquent\SoftDeletes;

class GedungModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'gedung';
    protected $primaryKey = 'id_gedung';

    protected $fillable = [
        'id_pemilik',
        'nama_gedung',
        'jumlah_kamar',
        'gambar_gedung',
    ];

    protected $dates = ['deleted_at'];

    public function pemilik()
    {
        return $this->belongsTo(User::class, 'id_pemilik');
    }
}
