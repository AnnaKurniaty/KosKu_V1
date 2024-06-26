<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Models\FasilitasModels as Fasilitas;
use App\Models\KebutuhanModels as Kebutuhan;
use Illuminate\Support\Facades\DB;
use App\Helper\ImageHelper;
use Illuminate\Support\Facades\Storage;

class FasilitasKamarController extends Controller
{
    public function fasilitasByKamar($id_gedung)
    {
        $fasilitas_kamar = DB::table('gedung as g')
            ->leftJoin('kamar as k', 'k.id_gedung', '=', 'g.id_gedung')
            ->leftJoin('fasilitas_kamar as fk', function($join) {
                $join->on('fk.id_kamar', '=', 'k.id_kamar')
                    ->whereNull('fk.deleted_at');
            })
            ->leftJoin('fasilitas as f', 'f.id_fasilitas', '=', 'fk.id_fasilitas')
            ->leftJoin('kebutuhan as ku', 'ku.id_fasilitas_kamar', '=', 'fk.id_fasilitas_kamar')
            ->where('g.id_gedung', '=', $id_gedung)
            ->whereNotNull('fk.id_fasilitas_kamar')
            ->groupBy('fk.id_fasilitas_kamar', 'f.nama_fasilitas', 'ku.biaya_pembelian', 'f.jumlah_fasilitas', 'ku.tanggal_pembelian', 'f.gamabar_fasilitas', 'ku.biaya_perbaikan', 'ku.tanggal_perbaikan')
            ->select(
                'fk.id_fasilitas_kamar', 
                'f.nama_fasilitas', 
                'f.jumlah_fasilitas',
                'ku.biaya_pembelian', 
                'ku.tanggal_pembelian', 
                'f.gamabar_fasilitas as gambar_fasilitas', 
                'ku.biaya_perbaikan', 
                'ku.tanggal_perbaikan'
            )
            ->get();

        $type = 'fasilitas_kamar';

        // Return the facilities as a JSON response
        return response()->json(['fasilitas_kamar' => $fasilitas_kamar, 'type' => $type]);
    }

    public function tambahFasilitasKamar(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
            'biaya_pembelian' => 'required|integer',
        ]);

        // Mengupload gambar dan simpan ke folder
        if ($request->hasFile('gambar_fasilitas')) {
            $image = $request->file('gambar_fasilitas');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('fasilitas', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        } else {
            $imageUrl = null;
        }

        // Insert into fasilitas table first to get id_fasilitas
        $fasilitas = Fasilitas::create([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'gamabar_fasilitas' => $imageUrl,
        ]);

        // Insert into fasilitas_kamar with the id_fasilitas
        $fasilitas_kamar = FasilitasKamar::create([
            'id_fasilitas' => $fasilitas->id_fasilitas,
        ]);

        // Insert into kebutuhan with the id_fasilitas_kamar
        Kebutuhan::create([
            'id_fasilitas_kamar' => $fasilitas_kamar->id_fasilitas_kamar,
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
        ]);

        return response()->json(['message' => 'Fasilitas kamar berhasil ditambahkan', 'fasilitas_kamar' => $fasilitas_kamar]);
    }

    public function updateFasilitasKamar(Request $request, $id_fasilitas_kamar)
    {   
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'biaya_perbaikan' => 'required|integer',
            'tanggal_perbaikan' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $fasilitas_kamar = FasilitasKamar::findOrFail($id_fasilitas_kamar);
        $fasilitas = Fasilitas::findOrFail($fasilitas_kamar->id_fasilitas);

        if (!$fasilitas || !$fasilitas_kamar) {
            return response()->json(['error' => 'Fasilitas not found'], 404);
        }

        // Handle image upload
        if ($fasilitas->gambar_fasilitas && $request->hasFile('gambar_fasilitas')) {
            ImageHelper::deleteImage($fasilitas->gambar_fasilitas);
        }

        $imageUrl = $request->hasFile('gambar_fasilitas') 
                    ? ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas_kamar')
                    : $fasilitas->gambar_fasilitas;

        // Update fasilitas_kamar and fasilitas
        $fasilitas->update([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'gamabar_fasilitas' => $imageUrl,
        ]);

        // Insert or update the kebutuhan record for perbaikan
        Kebutuhan::create([
            'id_fasilitas_kamar' => $fasilitas_kamar->id_fasilitas_kamar,
            'biaya_perbaikan' => $request->input('biaya_perbaikan'),
            'tanggal_perbaikan' => $request->input('tanggal_perbaikan'),
        ]);

        return response()->json(['message' => 'Fasilitas berhasil diubah', 'fasilitas_kamar' => $fasilitas_kamar]);
    }

    public function hapusFasilitasKamar($id_fasilitas_kamar)
    {
        $fasilitas_kamar = FasilitasKamar::findOrFail($id_fasilitas_kamar);

        if (!$fasilitas_kamar) {
            return response()->json(['error' => 'Fasilitas kamar not found'], 404);
        }

        // Soft delete the fasilitas_kamar
        $fasilitas_kamar->delete();

        return response()->json(['message' => 'Fasilitas kamar deleted successfully']);
    }


}
