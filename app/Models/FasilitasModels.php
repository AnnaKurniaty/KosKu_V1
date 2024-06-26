<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FasilitasModels extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fasilitas';
    protected $primaryKey = 'id_fasilitas';

    protected $fillable = [
        'nama_fasilitas',
        'jumlah_fasilitas',
        'gambar_fasilitas',
    ];
    
    protected $dates = ['deleted_at'];

}
