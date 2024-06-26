<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MenyewaModels as Menyewa;
use Illuminate\Database\Eloquent\SoftDeletes;

class PemasukanModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pemasukan';
    protected $primaryKey = 'id_pemasukan';

    protected $fillable = [
        'id_menyewa',
        'keterangan',
        'biaya_pemasukan',
        'tgl_pemasukan',
    ];

    protected $dates = ['deleted_at'];

    public function menyewa()
    {
        return $this->belongsTo(Menyewa::class, 'id_menyewa');
    }
}