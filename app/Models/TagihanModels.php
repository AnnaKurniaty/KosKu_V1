<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagihanModels extends Model
{
    use HasFactory;

    protected $table = 'tagihan';

    protected $fillable = [
        'id_penyewa',
        'tanggal_selesai_sewa',
        'biaya_tagihan',
        'status_pembayaran'
    ];

    public function penyewa()
    {
        return $this->belongsTo(Penyewa::class, 'id_penyewa');
    }

    public function pemasukan()
    {
        return $this->hasMany(Pemasukan::class, 'id_tagihan');
    }
}
