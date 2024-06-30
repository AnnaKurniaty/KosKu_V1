<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengeluaranModels as Pengeluaran;
use Illuminate\Support\Facades\DB;

class PengeluaranController extends Controller
{
    public function getPengeluaran($userId)
    {      
        $pengeluaran = DB::select('
        SELECT p.*
        FROM Pengeluaran p
        JOIN Kebutuhan k ON p.id_kebutuhan = k.id_kebutuhan
        LEFT JOIN Fasilitas_Kamar fk ON k.id_fasilitas_kamar = fk.id_fasilitas_kamar
        LEFT JOIN Kamar ka ON fk.id_kamar = ka.id_kamar
        LEFT JOIN Gedung gk ON ka.id_gedung = gk.id_gedung
        LEFT JOIN Gedung gfk ON fk.id_gedung = gfk.id_gedung
        LEFT JOIN Fasilitas_Umum fu ON k.id_fasilitas_umum = fu.id_fasilitas_umum
        LEFT JOIN Gedung gfu ON fu.id_gedung = gfu.id_gedung
        WHERE gk.id_pemilik = :userId
        OR gfk.id_pemilik = :userId
        OR gfu.id_pemilik = :userId', ['userId' => $userId]);
        
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
