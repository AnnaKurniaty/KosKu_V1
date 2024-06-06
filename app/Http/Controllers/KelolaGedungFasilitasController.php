<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GedungModels as Gedung;
use App\Models\KamarModels as Kamar;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasModels as Fasilitas;

class KelolaGedungFasilitasController extends Controller
{
    public function gedungByPemilik($userId)
    {
        $gedung = Gedung::where('id_pemilik', $userId)->get();
        return response()->json(['gedung' => $gedung]);
    }

    public function kamarByGedung($id_gedung)
    {
        $kamar = Kamar::where('id_gedung', $id_gedung)->get();
        return response()->json(['kamar' => $kamar]);
    }

    public function fasilitasUmumByGedung($id_gedung)
    {
        $fasilitasUmum = FasilitasUmum::where('id_gedung', $id_gedung)
            ->join('fasilitas as f', 'fasilitas_umum.id_fasilitas', '=', 'f.id_fasilitas')
            ->distinct()
            ->select('fasilitas_umum.id_fasilitas', 'f.nama_fasilitas', 'fasilitas_umum.*')
            ->get();

        // Return the facilities as a JSON response
        return response()->json(['fasilitas' => $fasilitasUmum]);
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

        // Return the facilities as a JSON response
        return response()->json(['fasilitas' => $fasilitas]);
    }

    public function tambahGedung(Request $request, $userId)
    {
        $request->validate([
            'nama_gedung' => 'required|string|max:255',
            'jumlah_kamar' => 'required|integer',
            'gambar_gedung' => 'nullable|string'
        ]);
    
        // Tambahkan 'id_pemilik' ke dalam request
        $request->merge(['id_pemilik' => $userId]);
    
        // Buat gedung baru dengan menggunakan data dari request
        $gedung = Gedung::create($request->all());
    
        return response()->json(['message' => 'Gedung berhasil ditambahkan', 'gedung' => $gedung]);
    }

    public function tambahFasilitas(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'biaya_perawatan' => 'required|string',
            'tanggal_perawatan' => 'nullable|date',
            'gambar_fasilitas' => 'nullable|string'
        ]);

        $fasilitas = Fasilitas::create($request->all());

        return response()->json(['message' => 'Fasilitas berhasil ditambahkan', 'fasilitas' => $fasilitas]);
    }
}
