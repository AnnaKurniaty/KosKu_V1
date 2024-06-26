<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FasilitasUmumModels as FasilitasUmum;
use App\Models\KebutuhanModels as Kebutuhan;
use App\Helper\ImageHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class FasilitasUmumController extends Controller
{
    public function fasilitasByGedung($id_gedung)
    {
        $fasilitas_umum = DB::table('gedung as g')
            ->leftJoin('fasilitas_umum as fu', function($join) {
                $join->on('fu.id_gedung', '=', 'g.id_gedung')
                    ->whereNull('fu.deleted_at');
            })
            ->leftJoin('fasilitas as f', 'f.id_fasilitas', '=', 'fu.id_fasilitas')
            ->leftJoin('kebutuhan as k', 'k.id_fasilitas_umum', '=', 'fu.id_fasilitas_umum')
            ->where('g.id_gedung', '=', $id_gedung)
            ->groupBy('fu.id_fasilitas_umum', 'f.nama_fasilitas', 'f.jumlah_fasilitas', 'k.biaya_pembelian', 'k.tanggal_pembelian', 'f.gamabar_fasilitas', 'k.biaya_perbaikan', 'k.tanggal_perbaikan')
            ->select(
                'fu.id_fasilitas_umum', 
                'f.nama_fasilitas', 
                'f.jumlah_fasilitas',
                'k.biaya_pembelian', 
                'k.tanggal_pembelian', 
                'f.gamabar_fasilitas as gambar_fasilitas', 
                'k.biaya_perbaikan', 
                'k.tanggal_perbaikan'
            )
            ->get();
        $type = 'fasilitas_umum';

        // Return the facilities as a JSON response
        return response()->json(['fasilitas_umum' => $fasilitas_umum, 'type' => $type]);
    }

    public function tambahFasilitasUmum(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'tanggal_pembelian' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
            'biaya_pembelian' => 'required|integer',
            'id_gedung' => 'required|integer|exists:gedung,id_gedung'
        ]);

        if ($request->hasFile('gambar_fasilitas')) {
            $image = $request->file('gambar_fasilitas');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('fasilitas', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }
    
        $fasilitas_umum = FasilitasUmum::create([
            'id_gedung' => $request->input('id_gedung'),
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        $fasilitas_umum->save();

        Kebutuhan::create([
            'id_fasilitas_umum' => $fasilitas_umum->id_fasilitas_umum,
            'tanggal_pembelian' => $request->input('tanggal_pembelian'),
            'biaya_pembelian' => $request->input('biaya_pembelian'),
        ]);

        return response()->json(['message' => 'Fasilitas umum berhasil ditambahkan', 'fasilitas_umum' => $fasilitas_umum]);
    }

    public function updateFasilitasUmum(Request $request, $id_fasilitas_umum)
    {   
        $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jumlah_fasilitas' => 'required|integer',
            'biaya_perbaikan' => 'required|string',
            'tanggal_perbaikan' => 'required|date',
            'gambar_fasilitas' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $fasilitas_umum = FasilitasUmum::findOrFail($id_fasilitas_umum);

        if (!$fasilitas_umum) {
            return response()->json(['error' => 'Fasilitas not found'], 404);
        }

        if ($fasilitas_umum->gambar_fasilitas && $request->hasFile('gambar_fasilitas')) {
            ImageHelper::deleteImage($fasilitas_umum->gambar_fasilitas);
        }

        $imageUrl = ImageHelper::uploadImage($request, 'gambar_fasilitas', 'fasilitas_umum');
        if ($imageUrl == null) {
            $imageUrl = $fasilitas_umum->gambar_fasilitas;
        }
    
        $fasilitas_umum->update([
            'nama_fasilitas' => $request->input('nama_fasilitas'),
            'jumlah_fasilitas' => $request->input('jumlah_fasilitas'),
            'gambar_fasilitas' => $imageUrl,
        ]);

        //Update for table fasilitas kamar
        Kebutuhan::create([
            'id_fasilitas_umum' => $fasilitas_umum->id_fasilitas_umum,
            'biaya_perbaikan' => $request->input('biaya_perbaikan'),
            'tanggal_perbaikan' => $request->input('tanggal_perbaikan'),
        ]);
    
        return response()->json(['message' => 'Fasilitas berhasil diubah', 'fasilitas_umum' => $fasilitas_umum]);
    }

    public function hapusFasilitasUmum($id_fasilitas_umum)
    {
        $fasilitas_umum = FasilitasUmum::withTrashed()->find($id_fasilitas_umum);

        if (!$fasilitas_umum) {
            return response()->json(['error' => 'Gedung not found'], 404);
        }

        $fasilitas_umum->delete();

        return response()->json(['message' => 'Fasilitas deleted successfully']);
    }
}
