<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GedungModels as Gedung;
use App\Models\FasilitasModels as Fasilitas;
use Illuminate\Database\Eloquent\SoftDeletes;

class FasilitasUmumModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fasilitas_umum';
    protected $primaryKey = 'id_fasilitas_umum';

    protected $fillable = [
        'id_gedung',
        'id_fasilitas',
    ];

    protected $dates = ['deleted_at'];

    public function gedung()
    {
        return $this->belongsTo(Gedung::class, 'id_gedung');
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class, 'id_fasilitas');
    }
}
