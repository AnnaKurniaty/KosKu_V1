<?php

namespace App\Http\Controllers;

use App\Models\KamarModels;
use App\Models\FasilitasKamarModels;
use App\Models\GedungModels;
use Illuminate\Http\Request;

class KamarController extends Controller
{
    public function getKamarKosong($id_pemilik)
    {
        $kamarKosong = Kamar::where('id_pemilik', $id_pemilik)
                            ->where('status_kamar', 'kosong')
                            ->with('fasilitas')
                            ->get();

        return response()->json($kamarKosong);
    }

    public function getKamarTerisi($id_pemilik)
    {
        $kamarTerisi = Kamar::where('id_pemilik', $id_pemilik)
                            ->where('status_kamar', 'terisi')
                            ->with('fasilitas')
                            ->get();

        return response()->json($kamarTerisi);
    }

    public function insertKamar(Request $request)
    {
        $kamar = Kamar::create($request->all());

        foreach ($request->fasilitas as $fasilitas) {
            FasilitasKamar::create([
                'id_kamar' => $kamar->id,
                'nama_fasilitas' => $fasilitas['nama_fasilitas'],
                'status_fasilitas' => $fasilitas['status_fasilitas'],
                'tanggal_pembelian' => $fasilitas['tanggal_pembelian'],
                'biaya_perawatan' => $fasilitas['biaya_perawatan'],
                'gambar_fasilitas' => $fasilitas['gambar_fasilitas'],
            ]);
        }

        return response()->json(['message' => 'Kamar dan fasilitas ditambahkan.']);
    }
}
