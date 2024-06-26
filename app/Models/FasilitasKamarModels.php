<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FasilitasModels as Fasilitas;
use App\Models\KamarModels as Kamar;
use Illuminate\Database\Eloquent\SoftDeletes;

class FasilitasKamarModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fasilitas_kamar';
    protected $primaryKey = 'id_fasilitas_kamar';

    protected $fillable = [
        'id_kamar',
        'id_fasilitas',
    ];
    
    protected $dates = ['deleted_at'];

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'id_kamar');
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class, 'id_fasilitas');
    }
}
