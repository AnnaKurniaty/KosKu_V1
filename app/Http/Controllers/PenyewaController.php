<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenyewaModels as Penyewa;
use App\Models\PemasukanModels as Pemasukan;
use App\Models\KamarModels as Kamar;
use App\Models\MenyewaModels as Menyewa;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Helper\ImageHelper;
use Illuminate\Support\Facades\Storage;

class PenyewaController extends Controller
{
    public function getPenyewa($userId)
    {
        $penyewa = DB::select('
        SELECT 
            p.id_penyewa,
            p.nama_lengkap,
            p.alamat_penyewa,
            p.nomor_telepon,
            p.no_pj_penyewa,
            p.foto_ktp,
            p.status_penyewa,
            k.id_kamar,
            k.nama_kamar,
            m.id_menyewa,
            m.tanggal_selesai_sewa,
            m.tanggal_mulai_sewa
        FROM 
            penyewa p
        JOIN 
            (
                SELECT 
                    m.id_menyewa,
                    m.id_penyewa,
                    m.id_kamar,
                    MAX(m.tanggal_mulai_sewa) AS tanggal_mulai_sewa,
                    MAX(m.tanggal_selesai_sewa) AS tanggal_selesai_sewa
                FROM 
                    menyewa m
                GROUP BY 
                    m.id_menyewa, m.id_penyewa, m.id_kamar
            ) m ON p.id_penyewa = m.id_penyewa
        JOIN 
            kamar k ON m.id_kamar = k.id_kamar
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
            'nama_lengkap' => 'required|string|max:255',
            'alamat_penyewa' => 'required|string',
            'nomor_telepon' => 'required|string|max:15',
            'no_pj_penyewa' => 'required|string|max:15',
            'status_penyewa' => 'sometimes|string|in:aktif,tidak aktif',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'id_kamar' => 'required|integer|exists:kamar,id_kamar',
            'tanggal_mulai_sewa' => 'required|date',
        ]);

        $status_penyewa = $request->input('status_penyewa', 'aktif');

        if ($request->hasFile('foto_ktp')) {
            $image = $request->file('foto_ktp');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('penyewa', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }

        $penyewa = Penyewa::create([
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'no_pj_penyewa' => $request->no_pj_penyewa,
            'status_penyewa' => $status_penyewa,
            'foto_ktp' => $imageUrl,
        ]);

        $tanggal_mulai_sewa = $request->input('tanggal_mulai_sewa');

        $menyewa = new Menyewa();
        $menyewa->id_penyewa = $penyewa->id_penyewa;
        $menyewa->id_kamar = $request->input('id_kamar');
        $menyewa->tanggal_mulai_sewa = $tanggal_mulai_sewa;
        $menyewa->tanggal_selesai_sewa = date('Y-m-d', strtotime($tanggal_mulai_sewa . ' +1 month'));
        $menyewa->save();

        $kamar = Kamar::find($request->input('id_kamar'));
        $kamar->status_kamar = 'terisi';
        $kamar->save();

        return response()->json(['message' => 'Penyewa dan Menyewa berhasil ditambahkan, status kamar diperbarui', 'penyewa' => $penyewa, 'menyewa' => $menyewa], 201);
    }

    public function hapusPenyewa($id_menyewa)
    {
        if (!is_numeric($id_menyewa)) {
            return response()->json(['error' => 'Invalid input for id_menyewa'], 400);
        }

        $menyewa = Menyewa::find((int)$id_menyewa);

        if (!$menyewa) {
            return response()->json(['error' => 'Record not found'], 404);
        }
        
        $penyewa = Penyewa::find($menyewa->id_penyewa);
        if($penyewa){
            $penyewa->status_penyewa = 'tidak aktif';
            $penyewa->save();
        }
        
        $kamar = Kamar::find($menyewa->id_kamar);
        if ($kamar) {
            $kamar->status_kamar = 'kosong';
            $kamar->save();
        }
        
        return response()->json(['message' => 'Status updated successfully'], 200);
    }


    public function updatePenyewa(Request $request, $id_menyewa)
    {   
        $request->validate([
            'id_kamar' => 'required|exists:kamar,id_kamar',
            'nama_lengkap' => 'required|string|max:255',
            'alamat_penyewa' => 'required|string',
            'nomor_telepon' => 'required|string|max:15',
            'no_pj_penyewa' => 'required|string|max:15',
            'foto_ktp' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Mencari data menyewa berdasarkan ID menyewa
        $menyewa = Menyewa::findOrFail($id_menyewa);

        // Jika data menyewa tidak ditemukan, kembalikan respons 404
        if (!$menyewa) {
            return response()->json(['error' => 'Data menyewa not found'], 404);
        }

        // Simpan ID kamar sebelumnya dari data menyewa
        $previousKamarId = $menyewa->id_kamar;

        // Mencari penyewa berdasarkan ID penyewa dari data menyewa
        $penyewa = Penyewa::findOrFail($menyewa->id_penyewa);

        // Jika penyewa tidak ditemukan, kembalikan respons 404
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

        // Default image URL jika tidak ada perubahan
        $imageUrl = $penyewa->foto_ktp;

        // Mengupload gambar dan simpan ke folder
        if ($request->hasFile('foto_ktp')) {
            $image = $request->file('foto_ktp');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('penyewa', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }

        // Update data penyewa
        $penyewa->update([
            'nama_lengkap' => $request->nama_lengkap,
            'alamat_penyewa' => $request->alamat_penyewa,
            'nomor_telepon' => $request->nomor_telepon,
            'no_pj_penyewa' => $request->no_pj_penyewa,
            'foto_ktp' => $imageUrl
        ]);

        // Update data menyewa dengan id_kamar baru
        $menyewa->update([
            'id_kamar' => $request->id_kamar,
        ]);

        // Mengubah status kamar baru menjadi terisi
        $kamarBaru = Kamar::findOrFail($request->id_kamar);
        $kamarBaru->update(['status_kamar' => 'terisi']);

        // Mengubah status kamar sebelumnya menjadi kosong jika berbeda dengan kamar baru
        if ($previousKamarId != $request->id_kamar) {
            // Memastikan kamar sebelumnya ada
            $kamarSebelumnya = Kamar::find($previousKamarId);
            if ($kamarSebelumnya) {
                $kamarSebelumnya->update(['status_kamar' => 'kosong']);
            }
        }

        return response()->json(['message' => 'Penyewa berhasil diubah', 'penyewa' => $penyewa]);
    }
    
    public function penyewaJatuhTempo($userId){
        $penyewaSelesaiSewaDuaMingguTerakhir = Menyewa::whereHas('kamar', function($query) use ($userId) {
            $query->whereHas('gedung', function($queryGedung) use ($userId) {
                $queryGedung->where('id_pemilik', $userId);
            })->where('status_kamar', 'terisi');
        })->whereHas('penyewa', function ($queryPenyewa) {
            $queryPenyewa->where('status_penyewa', 'aktif');
        })->whereDate('tanggal_selesai_sewa', '<=', now()->subWeeks(2)->format('Y-m-d'))
          ->orderBy('tanggal_selesai_sewa', 'desc')
          ->get()
          ->unique('id_penyewa');
    
        // Mengambil biaya kamar dari kamar yang sesuai
        foreach ($penyewaSelesaiSewaDuaMingguTerakhir as $item) {
            $item->biaya_kamar = $item->kamar->biaya_kamar;
        }
        foreach ($penyewaSelesaiSewaDuaMingguTerakhir as $item) {
            $item->nama_lengkap = $item->penyewa->nama_lengkap;
        }
        return response()->json($penyewaSelesaiSewaDuaMingguTerakhir);
    }

    public function lanjutSewa($id_menyewa)
    {
        try {
            // Ambil data menyewa berdasarkan id yang dipilih
            $menyewaLama = Menyewa::findOrFail($id_menyewa);
            
            // Duplikasi data menyewa lama
            $menyewaBaru = new Menyewa();
            $menyewaBaru->fill($menyewaLama->toArray());
            
            $menyewaBaru->tanggal_mulai_sewa = $menyewaLama->tanggal_selesai_sewa;
            
            $tanggalAwalSewa = new \DateTime($menyewaBaru->tanggal_mulai_sewa);
            $tanggalAwalSewa->modify('+1 month');
            $menyewaBaru->tanggal_selesai_sewa = $tanggalAwalSewa->format('Y-m-d');

            $menyewaBaru->save();
            
            return response()->json(['message' => 'Data menyewa berhasil ditambahkan', 'menyewa' => $menyewaBaru], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menambahkan data menyewa', 'error' => $e->getMessage()], 500);
        }
    }

    public function tidakLanjutSewa($id_menyewa)
    {
        try {
            // Ambil data menyewa berdasarkan id yang dipilih
            $menyewaLama = Menyewa::findOrFail($id_menyewa);
            
            // Duplikasi data menyewa lama
            $menyewaBaru = new Menyewa();
            $menyewaBaru->fill($menyewaLama->toArray());
            
            $menyewaBaru->tanggal_mulai_sewa = $menyewaLama->tanggal_selesai_sewa;
            
            $tanggalAwalSewa = new \DateTime($menyewaBaru->tanggal_mulai_sewa);
            $tanggalAwalSewa->modify('+1 month');
            $menyewaBaru->tanggal_selesai_sewa = $tanggalAwalSewa->format('Y-m-d');

            $menyewaBaru->save();

            // Mengubah status_penyewa menjadi tidak aktif di tabel penyewa
            $penyewa = Penyewa::findOrFail($menyewaLama->id_penyewa);
            $penyewa->status_penyewa = 'tidak aktif';
            $penyewa->save();

            // Mengubah status_kamar menjadi kosong di tabel kamar
            $kamar = Kamar::findOrFail($menyewaLama->id_kamar);
            $kamar->status_kamar = 'kosong';
            $kamar->save();
            
            return response()->json(['message' => 'Data menyewa berhasil ditambahkan', 'menyewa' => $menyewaBaru], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menambahkan data menyewa', 'error' => $e->getMessage()], 500);
        }
    }
}
