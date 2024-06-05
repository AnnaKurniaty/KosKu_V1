<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KamarModels as Kamar;
use App\Models\PemasukanModels as Pemasukan;
use App\Models\PengeluaranModels as Pengeluaran;
use App\Models\PenyewaModels as Penyewa;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function informasiKos($userId)
    {
        $jumlahKamarTerisi = Kamar::whereHas('gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->where('status_kamar', 'terisi')->count();

        $jumlahKamarKosong = Kamar::whereHas('gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->where('status_kamar', 'kosong')->count();

        $penyewaSelesaiSewaDuaMingguTerakhir = Penyewa::whereHas('kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->where('status_penyewa', 'aktif')
          ->whereBetween('tanggal_selesai_sewa', [Carbon::now()->subWeeks(2), Carbon::now()])
          ->get();

        $pemasukan = Pemasukan::whereHas('penyewa.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->sum('biaya_pemasukan');        

        $pengeluaran = Pengeluaran::whereHas('fasilitasKamar.kamar.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->orWhereHas('fasilitasUmum.gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->sum('biaya_pengeluaran');

        return response()->json([
            'jumlah_kamar_terisi' => $jumlahKamarTerisi,
            'jumlah_kamar_kosong' => $jumlahKamarKosong,
            'penyewa_selesai_sewa_dua_minggu_terakhir' => $penyewaSelesaiSewaDuaMingguTerakhir,
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
        ]);
    }

    public function storePemasukan(Request $request, $penyewaId)
    {
        // Validate id_penyewa
        $validatedData = $request->validate([
            'id_penyewa' => 'required|exists:penyewa,id_penyewa',
        ]);

        // Ensure that id_penyewa from the request matches the parameter penyewaId
        if ($request->id_penyewa != $penyewaId) {
            return response()->json(['message' => 'ID penyewa tidak sesuai'], 422);
        }

        // Get the penyewa along with room information
        $penyewa = Penyewa::with('kamar')->findOrFail($penyewaId);

        if (!$penyewa->kamar) {
            return response()->json(['message' => 'Kamar tidak ditemukan untuk penyewa ini'], 404);
        }

        // Get the room cost from the associated kamar
        $biayaKamar = $penyewa->kamar->biaya_kamar;

        // Check if the room cost is null or invalid
        if (is_null($biayaKamar) || !is_numeric($biayaKamar)) {
            return response()->json(['message' => 'Biaya kamar tidak valid'], 422);
        }

        // Create new pemasukan
        $pemasukan = new Pemasukan;
        $pemasukan->id_penyewa = $penyewaId;
        $pemasukan->keterangan = "Bayar Sewa ({$penyewa->nama_lengkap})";
        $pemasukan->biaya_pemasukan = $biayaKamar;
        $pemasukan->tgl_pemasukan = now()->toDateString();
        $pemasukan->save();

        return response()->json(['message' => 'Pemasukan berhasil ditambahkan', 'pemasukan' => $pemasukan], 201);
    }

    public function updatePenyewaStatus(Request $request, $penyewaId)
    {
        // Validasi data
        $validatedData = $request->validate([
            'id_penyewa' => 'required|exists:penyewa,id_penyewa',
        ]);

        // Log the request data and parameters for debugging
        \Log::info('Request id_penyewa: ' . $request->id_penyewa);
        \Log::info('URL penyewaId: ' . $penyewaId);

        // Ensure that id_penyewa from the request matches the parameter penyewaId
        if ($request->id_penyewa != $penyewaId) {
            return response()->json(['message' => 'ID penyewa tidak sesuai. Request id_penyewa: ' . $request->id_penyewa . ', URL penyewaId: ' . $penyewaId], 422);
        }

        // Dapatkan data penyewa berdasarkan ID
        $penyewa = Penyewa::findOrFail($penyewaId);
        $penyewa->status_penyewa = 'tidak aktif';
        $penyewa->save();

        return response()->json(['message' => 'Status penyewa berhasil diperbarui', 'penyewa' => $penyewa], 200);
    }
}
