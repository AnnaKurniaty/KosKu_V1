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
use Illuminate\Support\Facades\DB;

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
        $fasilitas = DB::table('gedung as g')
            ->leftJoin('fasilitas_umum as fu', function($join) {
                $join->on('fu.id_gedung', '=', 'g.id_gedung')
                    ->orWhereNull('fu.id_gedung');
            })
            ->leftJoin('fasilitas as f', 'f.id_fasilitas', '=', 'fu.id_fasilitas')
            ->where('g.id_gedung', '=', $id_gedung)
            ->groupBy('f.id_fasilitas', 'f.nama_fasilitas', 'f.jumlah_fasilitas','f.biaya_pembelian', 'f.tanggal_pembelian','f.gambar_fasilitas', 'fu.biaya_perawatan', 'fu.tanggal_perawatan')
            ->select(
                'f.id_fasilitas', 
                'f.nama_fasilitas', 
                'f.jumlah_fasilitas',
                'f.biaya_pembelian', 
                'f.tanggal_pembelian', 
                'f.gambar_fasilitas', 
                'fu.biaya_perawatan', 
                'fu.tanggal_perawatan'
            )
            ->get();
        $type = 'fasilitas_umum';

        // Return the facilities as a JSON response
        return response()->json(['fasilitas' => $fasilitas, 'type' => $type]);
    }

    public function fasilitasKamarByGedung($id_gedung)
    {
        $fasilitas = DB::table('gedung as g')
            ->leftJoin('kamar as k', 'k.id_gedung', '=', 'g.id_gedung')
            ->leftJoin('fasilitas_kamar as fk', function($join) {
                $join->on('fk.id_kamar', '=', 'k.id_kamar')
                    ->orWhereNull('fk.id_kamar');
            })
            ->leftJoin('fasilitas as f', 'f.id_fasilitas', '=', 'fk.id_fasilitas')
            ->where('g.id_gedung', '=', $id_gedung)
            ->groupBy('f.id_fasilitas', 'f.nama_fasilitas', 'f.biaya_pembelian', 'f.jumlah_fasilitas','f.tanggal_pembelian','f.gambar_fasilitas', 'fk.biaya_perawatan', 'fk.tanggal_perawatan')
            ->select(
                'f.id_fasilitas', 
                'f.nama_fasilitas', 
                'f.jumlah_fasilitas',
                'f.biaya_pembelian', 
                'f.tanggal_pembelian', 
                'f.gambar_fasilitas', 
                'fk.biaya_perawatan', 
                'fk.tanggal_perawatan'
            )
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

    //Fasilitas
    public function tambahFasilitasKamar(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_perawatan' => 'nullable|string',
            'tanggal_perawatan' => 'nullable|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
            'biaya_pembelian' => 'required|integer',
        ]);

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas');
    
        // Buat fasilitas baru dengan menggunakan data dari request
        $fasilitas = Fasilitas::create([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
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

    public function updateFasilitasKamar(Request $request, $id_fasilitas)
    {   
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_pembelian' => 'required|string',
            'biaya_perawatan' => 'required|string',
            'tanggal_perawatan' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //Mencari fasilitas berdasarkan ID
        $fasilitas = Fasilitas::findOrFail($id_fasilitas);

        // Jika fasilitas tidak ditemukan, kembalikan respons 404
        if (!$fasilitas) {
            return response()->json(['error' => 'Fasilitas not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($fasilitas->gambar_fasilitas && $request->hasFile('gambar_fasilitas')) {
            ImageHelper::deleteImage($fasilitas->gambar_fasilitas);
        }

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas');
        if ($imageUrl == null) {
            //default img url jika tidak ada perubahan
            $imageUrl = $fasilitas->gambar_fasilitas;
        }
    
        // Update fasilitas dengan menggunakan data dari request
        $fasilitas->update([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
            'biaya_perawatan' => $request->input('biaya_perawatan'),
            'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        //Update for table fasilitas kamar
        FasilitasKamar::where('id_fasilitas', $id_fasilitas)
            ->update([
                'biaya_perawatan' => $request->input('biaya_perawatan'),
                'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            ]);
    
        return response()->json(['message' => 'Fasilitas berhasil diubah', 'fasilitas' => $fasilitas]);
    }

    public function hapusFasilitasKamar($id_fasilitas)
    {
        //Mencari fasilitas berdasarkan ID
        $fasilitas = Fasilitas::find($id_fasilitas);

        // Jika gedung tidak ditemukan, kembalikan respons 404
        if (!$fasilitas) {
            return response()->json(['error' => 'Gedung not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($fasilitas->gambar_fasilitas) {
            ImageHelper::deleteImage($fasilitas->gambar_fasilitas);
        }

        // Hapus dari table fasilitas kamar
        FasilitasKamar::where('id_fasilitas', $id_fasilitas)->delete();

        // Hapus item dari database
        $fasilitas->delete();

        // Kembalikan respons sukses
        return response()->json(['message' => 'Fasilitas deleted successfully']);
    }

    public function tambahFasilitasUmum(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_perawatan' => 'nullable|string',
            'tanggal_perawatan' => 'nullable|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
            'biaya_pembelian' => 'required|integer',
        ]);

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas');
    
        // Buat fasilitas baru dengan menggunakan data dari request
        $fasilitas = Fasilitas::create([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_perawatan' => $request->input('biaya_perawatan'),
            'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        //insert ke table Fasilitas Kamar
        FasilitasUmum::create([
            'id_fasilitas' => $fasilitas->id_fasilitas,
        ]);

        return response()->json(['message' => 'Fasilitas umum berhasil ditambahkan', 'fasilitas' => $fasilitas]);
    }

    public function updateFasilitasUmum(Request $request, $id_fasilitas)
    {   
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_pembelian' => 'required|string',
            'biaya_perawatan' => 'required|string',
            'tanggal_perawatan' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //Mencari fasilitas berdasarkan ID
        $fasilitas = Fasilitas::findOrFail($id_fasilitas);

        // Jika fasilitas tidak ditemukan, kembalikan respons 404
        if (!$fasilitas) {
            return response()->json(['error' => 'Fasilitas not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($fasilitas->gambar_fasilitas && $request->hasFile('gambar_fasilitas')) {
            ImageHelper::deleteImage($fasilitas->gambar_fasilitas);
        }

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas');
        if ($imageUrl == null) {
            //default img url jika tidak ada perubahan
            $imageUrl = $fasilitas->gambar_fasilitas;
        }
    
        // Update fasilitas dengan menggunakan data dari request
        $fasilitas->update([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
            'biaya_perawatan' => $request->input('biaya_perawatan'),
            'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        //Update for table fasilitas kamar
        FasilitasUmum::where('id_fasilitas', $id_fasilitas)
            ->update([
                'biaya_perawatan' => $request->input('biaya_perawatan'),
                'tanggal_perawatan' => $request->input('tanggal_perawatan'),
            ]);
    
        return response()->json(['message' => 'Fasilitas berhasil diubah', 'fasilitas' => $fasilitas]);
    }

    public function hapusFasilitasUmum($id_fasilitas)
    {
        //Mencari fasilitas berdasarkan ID
        $fasilitas = Fasilitas::find($id_fasilitas);

        // Jika gedung tidak ditemukan, kembalikan respons 404
        if (!$fasilitas) {
            return response()->json(['error' => 'Gedung not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($fasilitas->gambar_fasilitas) {
            ImageHelper::deleteImage($fasilitas->gambar_fasilitas);
        }

        // Hapus dari table fasilitas kamar
        FasilitasUmum::where('id_fasilitas', $id_fasilitas)->delete();

        // Hapus item dari database
        $fasilitas->delete();

        // Kembalikan respons sukses
        return response()->json(['message' => 'Fasilitas deleted successfully']);
    }

    //Kamar
    public function tambahKamar(Request $request)
    {
        $request->validate([
            'id_gedung' => 'required',
            'nama_kamar' => 'required|string',
            'biaya_kamar' => 'required|integer',
            'gambar_kamar' => 'image|mimes:jpeg,png,jpg|max:2048',
            'id_fasilitas_list' => 'required|array'
        ]);

        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_kamar', 'kamar');
    
        // Buat kamar baru dengan menggunakan data dari request
        $kamar = Kamar::create([
            'id_gedung' => $request->input('id_gedung'),
            'nama_kamar' => $request->input('nama_kamar'),
            'biaya_kamar' => $request->input('biaya_kamar'),
            'status_kamar' => 'kosong',
            'gambar_kamar' => $imageUrl,
        ]);

        //insert ke table Fasilitas Kamar
        // Iterasi melalui array id_fasilitas
        foreach ($request->input('id_fasilitas_list') as $idFasilitas) {
            FasilitasKamar::create([
                'id_kamar' => $kamar->id_kamar,
                'id_fasilitas' => $idFasilitas,
            ]);
        }

        return response()->json(['message' => 'Kamar berhasil ditambahkan', 'kamar' => $kamar]);
    }

}
