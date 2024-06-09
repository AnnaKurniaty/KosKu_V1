<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenyewaModels as Penyewa;
use App\Models\KamarModels as Kamar;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class KelolaPenyewaController extends Controller
{
    public function kelolaPenyewa($userId)
    {
        $penyewa = DB::select('
        SELECT 
            p.*,
            k.nama_kamar
        FROM 
            penyewa p
        JOIN 
            kamar k ON p.id_kamar = k.id_kamar
        JOIN 
            gedung g ON k.id_gedung = g.id_gedung
        WHERE 
            g.id_pemilik = :userId
        ', ['userId' => $userId]);

        return response()->json(['penyewa' => $penyewa]);
    }

    public function tambahPenyewa(Request $request)
    {
        $request->validate([
            'id_kamar' => 'required|exists:kamar,id',
            'nama_lengkap' => 'required|string|max:255',
            'alamat_penyewa' => 'required|string',
            'nomor_telepon' => 'required|string|max:15',
            'no_pj_penyewa' => 'required|string|max:15',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $tanggal_mulai_sewa = Carbon::now();
        $tanggal_selesai_sewa = $tanggal_mulai_sewa->copy()->addMonth();

        if ($request->hasFile('foto_ktp')) {
            $image = $request->file('foto_ktp');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('gedung/gambar_gedung', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }

        $penyewa = Penyewa::create([
            'id_kamar' => $request->id_kamar,
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'no_pj_penyewa' => $request->no_pj_penyewa,
            'tanggal_mulai_sewa' => $tanggal_mulai_sewa,
            'tanggal_selesai_sewa' => $tanggal_selesai_sewa,
            'status_penyewa' => $status_penyewa,
            'foto_ktp' => $imageUrl,
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

    public function updatePenyewa(Request $request, $id_penyewa)
    {   
        $request->validate([
            'id_kamar' => 'required|exists:kamar,id',
            'nama_lengkap' => 'required|string|max:255',
            'alamat_penyewa' => 'required|string',
            'nomor_telepon' => 'required|string|max:15',
            'no_pj_penyewa' => 'required|string|max:15',
            'tanggal_mulai_sewa' => 'required|date',
            'tanggal_selesai_sewa' => 'required|date',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //Mencari gedung berdasarkan ID
        $penyewa = Penyewa::findOrFail($id_penyewa);

        // Jika gedung tidak ditemukan, kembalikan respons 404
        if (!$penyewa) {
            return response()->json(['error' => 'Penyewa not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($penyewa->foto_ktp && $request->hasFile('foto_ktp')) {
            $url = $penyewa->foto_ktp;
            $parts = explode('/storage/', $url);
            $pathAfterStorage = $parts[1];
            if (file_exists(public_path("storage/$pathAfterStorage"))) {
                unlink(public_path("storage/$pathAfterStorage"));
            }
        }

        //default img url jika tidak ada perubahan
        $imageUrl = $penyewa->foto_ktp;

        // Mengupload gambar dan simpan ke folder
        if ($request->hasFile('foto_ktp')) {
            $image = $request->file('foto_ktp');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('penyewa', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }
    
        $penyewa->update([
            'id_kamar' => $request->id_kamar,
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'no_pj_penyewa' => $request->no_pj_penyewa,
            'tanggal_mulai_sewa' => $tanggal_mulai_sewa,
            'tanggal_selesai_sewa' => $tanggal_selesai_sewa,
            'status_penyewa' => $status_penyewa,
            'foto_ktp' => $imageUrl,
        ]);
    
        return response()->json(['message' => 'Penyewa berhasil diubah', 'penyewa' => $penyewa]);
    }
}
