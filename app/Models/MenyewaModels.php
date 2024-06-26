<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\KamarModels as Kamar;
use App\Models\PenyewaModels as Penyewa;
use App\Models\PemasukanModels as Pemasukan;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenyewaModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'menyewa';
    protected $primaryKey = 'id_menyewa';

    protected $fillable = [
        'id_kamar',
        'id_penyewa',
        'tanggal_mulai_sewa',
        'tanggal_selesai_sewa',
    ];

    protected $dates = ['deleted_at'];

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'id_kamar');
    }

    public function penyewa()
    {
        return $this->belongsTo(Penyewa::class, 'id_penyewa');
    }
}
