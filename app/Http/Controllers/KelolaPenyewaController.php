<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenyewaModels as Penyewa;
use App\Models\KamarModels as Kamar;
use Carbon\Carbon;

class KelolaPenyewaController extends Controller
{
    public function kelolaPenyewa($id_pemilik)
    {
        $penyewa = Penyewa::whereHas('kamar.gedung', function($query) use ($id_pemilik) {
            $query->where('id_pemilik', $id_pemilik);
        })->get();

        return response()->json(['penyewa' => $penyewa]);
    }

    public function tambahPenyewa(Request $request)
    {
        $request->validate([
            'id_kamar' => 'required|exists:kamar,id',
            'nama_lengkap' => 'required|string|max:255',
            'alamat_penyewa' => 'required|string',
            'nomor_telepon' => 'required|string|max:15',
            'foto_ktp' => 'nullable|string'
        ]);

        $tanggal_mulai_sewa = Carbon::now();
        $tanggal_selesai_sewa = $tanggal_mulai_sewa->copy()->addMonth();

        $penyewa = Penyewa::create([
            'id_kamar' => $request->id_kamar,
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'tanggal_mulai_sewa' => $tanggal_mulai_sewa,
            'tanggal_selesai_sewa' => $tanggal_selesai_sewa,
            'status_penyewa' => 'aktif',
            'foto_ktp' => $request->foto_ktp,
        ]);

        return response()->json(['message' => 'Penyewa berhasil ditambahkan', 'penyewa' => $penyewa]);
    }

    public function detailPenyewa($id_penyewa)
    {
        $penyewa = Penyewa::find($id_penyewa);
        if (!$penyewa) {
            return response()->json(['message' => 'Penyewa tidak ditemukan'], 404);
        }
        return response()->json(['penyewa' => $penyewa]);
    }

    public function updateStatusPenyewa($id_penyewa, $status)
    {
        $penyewa = Penyewa::find($id_penyewa);
        if (!$penyewa) {
            return response()->json(['message' => 'Penyewa tidak ditemukan'], 404);
        }
        $penyewa->update(['status_penyewa' => $status]);
        return response()->json(['message' => 'Status penyewa berhasil diupdate']);
    }

    public function hapusPenyewa($id_penyewa)
    {
        $penyewa = Penyewa::find($id_penyewa);
        if (!$penyewa) {
            return response()->json(['message' => 'Penyewa tidak ditemukan'], 404);
        }
        $penyewa->delete();
        return response()->json(['message' => 'Penyewa berhasil dihapus']);
    }
}
