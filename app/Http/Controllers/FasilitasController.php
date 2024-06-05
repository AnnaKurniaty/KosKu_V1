<?php

namespace App\Http\Controllers;

use App\Models\FasilitasModels;
use App\Models\FasilitasUmumModels;
use App\Models\FasilitasKamarModels;
use App\Models\GedungModels;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    public function getFasilitasUmum($id_gedung)
    {
        $fasilitasUmum = FasilitasUmum::where('id_gedung', $id_gedung)->get();

        return response()->json($fasilitasUmum);
    }

    public function getFasilitasKamar($id_gedung)
    {
        $fasilitasKamar = FasilitasKamar::where('id_gedung', $id_gedung)->get();

        return response()->json($fasilitasKamar);
    }

    public function insertFasilitasUmum(Request $request)
    {
        $fasilitasUmum = FasilitasUmum::create($request->all());

        return response()->json(['message' => 'Fasilitas umum ditambahkan.']);
    }

    public function insertFasilitasKamar(Request $request)
    {
        $fasilitasKamar = FasilitasKamar::create($request->all());

        return response()->json(['message' => 'Fasilitas kamar ditambahkan.']);
    }
}
