<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PenyewaModels as Penyewa;
use Illuminate\Database\Eloquent\SoftDeletes;

class PemasukanModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pemasukan';
    protected $primaryKey = 'id_pemasukan';

    protected $fillable = [
        'id_penyewa',
        'keterangan',
        'biaya_pemasukan',
        'tgl_pemasukan',
    ];

    protected $dates = ['deleted_at'];

    // Relationship with Penyewa
    public function penyewa()
    {
        return $this->belongsTo(Penyewa::class, 'id_penyewa');
    }
}