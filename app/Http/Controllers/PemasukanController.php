<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PemasukanModels as Pemasukan;
use App\Models\PenyewaModels as Penyewa;
use Illuminate\Support\Facades\DB;

class PemasukanController extends Controller
{
    public function pemasukanBulanan($userId)
    {
        $currentYear = date('Y'); // Tahun saat ini

        $pemasukanBulanan = DB::table('pemasukan')
            ->select(
                DB::raw('EXTRACT(MONTH FROM tgl_pemasukan) as bulan'),
                DB::raw('SUM(biaya_pemasukan) as total_pemasukan')
            )
            ->whereExists(function($query) use ($userId) {
                $query->select(DB::raw(1))
                    ->from('menyewa')
                    ->join('kamar', 'menyewa.id_kamar', '=', 'kamar.id_kamar')
                    ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
                    ->whereRaw('menyewa.id_menyewa = pemasukan.id_menyewa')
                    ->where('gedung.id_pemilik', $userId);
            })
            ->whereYear('tgl_pemasukan', $currentYear)
            ->groupBy(DB::raw('EXTRACT(MONTH FROM tgl_pemasukan)'))
            ->get();

        return response()->json([
            'pemasukan' => $pemasukanBulanan
        ]);
    }

    public function getPemasukan($userId)
    {
        $pemasukan = Pemasukan::whereHas('menyewa.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->get()->toArray();          

        return response()->json(['pemasukan' => $pemasukan]);
    }
}
