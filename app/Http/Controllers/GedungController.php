<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GedungModels as Gedung;
use App\Models\KamarModels as Kamar;
use Illuminate\Support\Facades\Storage;
use App\Helper\ImageHelper;
use Illuminate\Support\Facades\DB;

class GedungController extends Controller
{
    public function gedungByPemilik($userId)
    {
        $gedung = Gedung::where('id_pemilik', $userId)->get();

        foreach ($gedung as $g) {
            $jumlah_kamar = Kamar::where('id_gedung', $g->id_gedung)->count();
            $g->jumlah_kamar = $jumlah_kamar;
        }

        return response()->json(['gedung' => $gedung]);
    }

    public function tambahGedung(Request $request, $userId)
    {
        $request->validate([
            'nama_gedung' => 'required|string|max:255',
            'jumlah_kamar' => 'required|integer',
            'gambar_gedung' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

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
            ImageHelper::deleteImage($gedung->gambar_gedung);
        }

        // Hapus item dari database
        $gedung->delete();

        // Kembalikan respons sukses
        return response()->json(['message' => 'Gedung deleted successfully']);
    }
}
