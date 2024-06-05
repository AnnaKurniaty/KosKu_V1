<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PemasukanModels as Pemasukan;
use App\Models\PengeluaranModels as Pengeluaran;

class LaporanController extends Controller
{
    public function laporan($userId)
    {
        $pemasukan = Pemasukan::whereHas('penyewa.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->get();        

        $pengeluaran = Pengeluaran::whereHas('fasilitasKamar.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->orWhereHas('fasilitasUmum.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->get();

        return response()->json(['pemasukan' => $pemasukan, 'pengeluaran' => $pengeluaran]);
    }
}
