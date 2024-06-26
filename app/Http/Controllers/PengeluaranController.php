<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengeluaranModels as Pengeluaran;
use Illuminate\Support\Facades\DB;

class PengeluaranController extends Controller
{
    public function getPengeluaran($userId)
    {      
        $pengeluaran = Pengeluaran::whereHas('fasilitasKamar.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->orWhereHas('fasilitasUmum.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->get()->toArray();

        return response()->json(['pengeluaran' => $pengeluaran]);
    }

     
    public function pengeluaranBulanan($userId)
    {
        $currentYear = date('Y'); // Tahun saat ini

        $pengeluaranBulanan = DB::table('pengeluaran')
            ->select(
                DB::raw('EXTRACT(MONTH FROM tgl_pengeluaran) as bulan'),
                DB::raw('SUM(biaya_pengeluaran) as total_pengeluaran')
            )
            ->whereExists(function($query) use ($userId) {
                $query->select(DB::raw(1))
                    ->from('kebutuhan')
                    ->join('fasilitas_kamar', 'kebutuhan.id_fasilitas_kamar', '=', 'fasilitas_kamar.id_fasilitas_kamar')
                    ->join('kamar', 'fasilitas_kamar.id_kamar', '=', 'kamar.id_kamar')
                    ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
                    ->whereRaw('kebutuhan.id_kebutuhan = pengeluaran.id_kebutuhan')
                    ->where('gedung.id_pemilik', $userId);
            })
            ->whereYear('tgl_pengeluaran', $currentYear)
            ->groupBy(DB::raw('EXTRACT(MONTH FROM tgl_pengeluaran)'))
            ->get();

        return response()->json([
            'pengeluaran' => $pengeluaranBulanan
        ]);
    }
}
