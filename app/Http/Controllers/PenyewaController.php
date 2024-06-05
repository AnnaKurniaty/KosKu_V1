<?php

namespace App\Http\Controllers;

use App\Models\PenyewaModels;
use Illuminate\Http\Request;
use App\Models\KamarModels;
use App\Models\TagihanModels;
use Carbon\Carbon;
use DB;

class PenyewaController extends Controller
{
    public function tambahPenyewa(Request $request)
    {
        $penyewa = Penyewa::create([
            'id_kamar' => $request->id_kamar,
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'tanggal_mulai_sewa' => Carbon::now(),
            'tanggal_selesai_sewa' => Carbon::now()->addMonth(),
            'status' => 'aktif'
        ]);

        // Select kamar dengan status kosong yang dimiliki id pemilik
        $kamarKosong = Kamar::where('id_pemilik', $request->id_pemilik)
                            ->where('status_kamar', 'kosong')
                            ->get();

        return response()->json(['penyewa' => $penyewa, 'kamar_kosong' => $kamarKosong]);
    }

    public function updateStatusTagihan(Request $request, $id)
    {
        $tagihan = Tagihan::where('id_penyewa', $id)->first();
        if ($tagihan) {
            $tagihan->status_pembayaran = 'lunas';
            $tagihan->save();
        }

        return response()->json(['message' => 'Status pembayaran diperbarui.']);
    }

    public function updateStatusPenyewa(Request $request, $id)
    {
        $penyewa = Penyewa::findOrFail($id);
        $penyewa->status = 'tidak aktif';
        $penyewa->save();

        return response()->json(['message' => 'Status penyewa diperbarui.']);
    }

    public function hapusPenyewa($id)
    {
        $penyewa = Penyewa::findOrFail($id);
        $penyewa->delete();

        return response()->json(['message' => 'Penyewa dihapus.']);
    }
}