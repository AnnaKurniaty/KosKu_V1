<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GedungModels as Gedung;
use App\Models\KamarModels as Kamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasModels as Fasilitas;
use Illuminate\Support\Facades\Storage;
use App\Helper\ImageHelper;

class KelolaGedungFasilitasController extends Controller
{
    public function kamarByGedung($id_gedung)
    {
        $kamar = Kamar::where('id_gedung', $id_gedung)->get();
        $type = 'kamar';

        return response()->json(['kamar' => $kamar, 'type' => $type]);
    }

    public function fasilitasUmumByGedung($id_gedung)
    {
        $fasilitas = FasilitasUmum::where('id_gedung', $id_gedung)
            ->join('fasilitas', 'fasilitas_umum.id_fasilitas', '=', 'fasilitas.id_fasilitas')
            ->distinct()
            ->select('fasilitas_umum.id_fasilitas', 'fasilitas.nama_fasilitas', 'fasilitas.gambar_fasilitas', 'fasilitas_umum.*')
            ->get();
        $type = 'fasilitas_umum';

        // Return the facilities as a JSON response
        return response()->json(['fasilitas' => $fasilitas, 'type' => $type]);
    }

    public function fasilitasKamarByGedung($id_gedung)
    {
        $fasilitas = FasilitasKamar::where('id_gedung', $id_gedung)
            ->join('kamar as k', 'fasilitas_kamar.id_kamar', '=', 'k.id_kamar')
            ->join('fasilitas as f', 'fasilitas_kamar.id_fasilitas', '=', 'f.id_fasilitas')
            ->where('k.id_gedung', $id_gedung)
            ->distinct()
            ->select('f.*')
            ->get();
        $type = 'fasilitas_kamar';

        // Return the facilities as a JSON response
        return response()->json(['fasilitas' => $fasilitas, 'type' => $type]);
    }

    public function gedungByPemilik($userId)
    {
        $gedung = Gedung::where('id_pemilik', $userId)->get();
        return response()->json(['gedung' => $gedung]);
    }

    public function tambahGedung(Request $request, $userId)
    {
        $request->validate([
            'nama_gedung' => 'required|string|max:255',
            'jumlah_kamar' => 'required|integer',
            'gambar_gedung' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        // Tambahkan 'id_pemilik' ke dalam request
        // $request->merge(['id_pemilik' => $userId]);

        // Mengupload gambar dan simpan ke folder
        if ($request->hasFile('gambar_gedung')) {
            $image = $request->file('gambar_gedung');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('gedung/gambar_gedung', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }
    
        // Buat gedung baru dengan menggunakan data dari request
        $gedung = Gedung::create([
            'id_pemilik' => $userId,
            'nama_gedung' => $request->input('nama_gedung'),
            'jumlah_kamar' => $request->input('jumlah_kamar'),
            'gambar_gedung' => $imageUrl,
        ]);
    
        return response()->json(['message' => 'Gedung berhasil ditambahkan', 'gedung' => $gedung]);
    }

    public function updateGedung(Request $request, $id_gedung)
    {   
        $request->validate([
            'nama_gedung' => 'required|string|max:255',
            'gambar_gedung' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //Mencari gedung berdasarkan ID
        $gedung = Gedung::findOrFail($id_gedung);

        // Jika gedung tidak ditemukan, kembalikan respons 404
        if (!$gedung) {
            return response()->json(['error' => 'Gedung not found'], 404);
        }
    
        // Tambahkan 'id_pemilik' ke dalam request
        // $request->merge(['id_pemilik' => $userId]);

        // Hapus file gambar jika ada
        if ($gedung->gambar_gedung && $request->hasFile('gambar_gedung')) {
            $url = $gedung->gambar_gedung;
            $parts = explode('/storage/', $url);
            $pathAfterStorage = $parts[1];
            if (file_exists(public_path("storage/$pathAfterStorage"))) {
                unlink(public_path("storage/$pathAfterStorage"));
            }
        }

        //default img url jika tidak ada perubahan
        $imageUrl = $gedung->gambar_gedung;

        // Mengupload gambar dan simpan ke folder
        if ($request->hasFile('gambar_gedung')) {
            $image = $request->file('gambar_gedung');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('gedung/gambar_gedung', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }
    
        // Update gedung dengan menggunakan data dari request
        $gedung->update([
            'nama_gedung' => $request->input('nama_gedung'),
            'gambar_gedung' => $imageUrl,
        ]);
    
        return response()->json(['message' => 'Gedung berhasil diubah', 'gedung' => $gedung]);
    }

    public function hapusGedung($id)
    {
        //Mencari gedung berdasarkan ID
        $gedung = Gedung::find($id);

        // Jika gedung tidak ditemukan, kembalikan respons 404
        if (!$gedung) {
            return response()->json(['error' => 'Gedung not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($gedung->gambar_gedung) {
            $url = $gedung->gambar_gedung;
            $parts = explode('/storage/', $url);
            $pathAfterStorage = $parts[1];
            if (file_exists(public_path("storage/$pathAfterStorage"))) {
                unlink(public_path("storage/$pathAfterStorage"));
            }
        }

        // Hapus item dari database
        $gedung->delete();

        // Kembalikan respons sukses
        return response()->json(['message' => 'Gedung deleted successfully']);
    }

    //Fasilitas
    public function tambahFasilitasKamar(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_perawatan' => 'string',
            'tanggal_perawatan' => 'nullable|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
            'biaya_pembelian' => 'required|integer',
        ]);

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas');
    
        // Buat fasilitas baru dengan menggunakan data dari request
        $fasilitas = Fasilitas::create([
            'nama_fasilitas' => $request->input('jumlah_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_perawatan' => $request->input('biaya_perawatan'),
            'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        //insert ke table Fasilitas Kamar
        FasilitasKamar::create([
            'id_fasilitas' => $fasilitas->id_fasilitas,
        ]);

        return response()->json(['message' => 'Fasilitas kamar berhasil ditambahkan', 'fasilitas' => $fasilitas]);
    } 

}
