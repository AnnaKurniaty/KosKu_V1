<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KamarModels as Kamar;
use App\Models\PenyewaModels as Penyewa;
use App\Models\MenyewaModels as Menyewa;
use App\Models\FasilitasKamarModels as FasilitasKamar;
use App\Helper\ImageHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class KamarController extends Controller
{
    public function getKamarTerisi($userId)
    {
        $jumlahKamarTerisi = Kamar::whereHas('gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->where('status_kamar', 'terisi')->count();

        return response()->json(['jumlah_kamar_terisi' => $jumlahKamarTerisi]);
    }

    public function getKamarKosong($userId)
    {
        $jumlahKamarKosong = Kamar::whereHas('gedung', function($query) use ($userId) {
            $query->where('id_pemilik', $userId);
        })->where('status_kamar', 'kosong')->count();

        return response()->json(['jumlah_kamar_kosong' => $jumlahKamarKosong]);
    }

    public function getKamar($id_kamar)
    {
        $kamar = DB::table('kamar as k')
            ->leftJoin('fasilitas_kamar as kf', 'k.id_kamar', '=', 'kf.id_kamar')
            ->where('k.id_kamar', '=', $id_kamar)
            ->whereNull('k.deleted_at')
            ->groupBy('k.id_kamar', 'k.nama_kamar', 'k.biaya_kamar', 'k.status_kamar', 'k.gambar_kamar')
            ->select(
                'k.id_kamar',
                'k.nama_kamar',
                'k.biaya_kamar',
                'k.status_kamar',
                'k.gambar_kamar',
                DB::raw('STRING_AGG(kf.id_fasilitas::text, \',\') as id_fasilitas_list')
            )
            ->get();

        $type = 'kamar';

        return response()->json(['kamar' => $kamar, 'type' => $type]);
    }

    public function getListKosong()
    {
        $kamar = Kamar::where('status_kamar', 'kosong')
                    ->get();

        return response()->json($kamar);
    }

    public function getListKamarKosong($id_pemilik)
    {
        $kamar = Kamar::where('status_kamar', 'kosong')
                    ->whereHas('gedung', function ($query) use ($id_pemilik) {
                        $query->where('id_pemilik', $id_pemilik);
                    })
                    ->get();

        return response()->json($kamar);
    }

    public function kamarByGedung($id_gedung)
    {
        $kamar = DB::table('kamar as k')
            ->leftJoin('fasilitas_kamar as kf', 'k.id_kamar', '=', 'kf.id_kamar')
            ->where('k.id_gedung', '=', $id_gedung)
            ->whereNull('k.deleted_at')
            ->groupBy('k.id_kamar', 'k.nama_kamar', 'k.biaya_kamar', 'k.status_kamar', 'k.gambar_kamar')
            ->select(
                'k.id_kamar',
                'k.nama_kamar',
                'k.biaya_kamar',
                'k.status_kamar',
                'k.gambar_kamar',
                DB::raw('STRING_AGG(kf.id_fasilitas::text, \',\') as id_fasilitas_list')
            )
            ->orderBy('k.nama_kamar', 'asc')
            ->get();

        $type = 'kamar';

        return response()->json(['kamar' => $kamar, 'type' => $type]);
    }

    public function tambahKamar(Request $request)
    {
        $request->validate([
            'id_gedung' => 'required|integer',
            'nama_kamar' => 'required|string',
            'biaya_kamar' => 'required|integer',
            'gambar_kamar' => 'image|mimes:jpeg,png,jpg|max:2048',
            'id_fasilitas_list' => 'array'
        ]);

        if ($request->hasFile('gambar_kamar')) {
            $image = $request->file('gambar_kamar');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('kamar/gambar_kamar', $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }

        // Buat kamar baru dengan menggunakan data dari request
        $kamar = Kamar::create([
            'id_gedung' => $request->input('id_gedung'),
            'nama_kamar' => $request->input('nama_kamar'),
            'biaya_kamar' => $request->input('biaya_kamar'),
            'status_kamar' => 'kosong',
            'gambar_kamar' => $imageUrl,
        ]);

        foreach ($request->input('id_fasilitas_list') as $idFasilitas) {
            FasilitasKamar::create([
                'id_kamar' => $kamar->id_kamar,
                'id_fasilitas' => $idFasilitas,
                'id_gedung' => $request->input('id_gedung'),
            ]);
        }

        return response()->json(['message' => 'Kamar berhasil ditambahkan', 'kamar' => $kamar]);
    }


    public function updateKamar(Request $request, $id_kamar)
    {
        $request->validate([
            'id_gedung' => 'required',
            'nama_kamar' => 'required|string',
            'biaya_kamar' => 'required|integer',
            'gambar_kamar' => 'image|mimes:jpeg,png,jpg|max:2048',
            'id_fasilitas_list' => 'required|array'
        ]);

        $kamar = Kamar::findOrFail($id_kamar);

        if (!$kamar) {
            return response()->json(['error' => 'Kamar not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($kamar->gambar_kamar && $request->hasFile('gambar_kamar')) {
            ImageHelper::deleteImage($kamar->gambar_kamar);
        }
        // Mengupload gambar dan simpan ke folder
        $imageUrl = ImageHelper::uploadImage($request, 'gambar_kamar', 'kamar');

        if ($imageUrl == null) {
            //default img url jika tidak ada perubahan
            $imageUrl = $kamar->gambar_kamar;
        }
        // Update kamar dengan menggunakan data dari request
        $kamar->update([
            'id_gedung' => $request->input('id_gedung'),
            'nama_kamar' => $request->input('nama_kamar'),
            'biaya_kamar' => $request->input('biaya_kamar'),
            'gambar_kamar' => $imageUrl,
        ]);

        FasilitasKamar::where('id_kamar', $kamar->id_kamar)->forceDelete();

        foreach ($request->input('id_fasilitas_list') as $idFasilitas) {
            FasilitasKamar::create([
                'id_kamar' => $kamar->id_kamar,
                'id_fasilitas' => $idFasilitas,
                'id_gedung' => $request->input('id_gedung'),
            ]);
        }

        return response()->json(['message' => 'Kamar berhasil diubah', 'kamar' => $kamar]);
    }

    public function hapusKamar($id_kamar)
    {
        $kamar = Kamar::findOrFail($id_kamar);

        if (!$kamar) {
            return response()->json(['error' => 'Kamar not found'], 404);
        }

        // Update status penyewa menjadi 'tidak aktif'
        $menyewa = Menyewa::where('id_kamar', $id_kamar)->get();
        foreach ($menyewa as $sewa) {
            $penyewa = Penyewa::findOrFail($sewa->id_penyewa);
            if ($penyewa) {
                $penyewa->status_penyewa = 'tidak aktif';
                $penyewa->save();
            }
        }

        // Delete gambar_kamar if exists
        if ($kamar->gambar_kamar) {
            ImageHelper::deleteImage($kamar->gambar_kamar);
        }

        // Delete the kamar
        $kamar->delete();

        return response()->json(['message' => 'Kamar deleted successfully']);
    }

}
