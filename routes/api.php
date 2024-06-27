<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KelolaPenyewaController;
use App\Http\Controllers\KelolaGedungFasilitasController;
use App\Http\Controllers\PenyewaController;
use App\Http\Controllers\KamarController;
use App\Http\Controllers\GedungController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\FasilitasKamarController;
use App\Http\Controllers\FasilitasUmumController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
});

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);

//Pemilik
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/pemilik/{userId}', [UserController::class, 'showPemilik']);
    Route::put('/pemilik/{userId}', [UserController::class, 'updatePemilik']);
    Route::delete('/pemilik/{userId}', [UserController::class, 'hapusPemilik']);
});

//Informasi Kos
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/informasi-kos/kamar-terisi/{userId}', [KamarController::class, 'getKamarTerisi']);
    Route::get('/informasi-kos/kamar-kosong/{userId}', [KamarController::class, 'getKamarKosong']);
    Route::get('/informasi-kos/penyewa-jatuh-tempo/{userId}', [PenyewaController::class, 'penyewaJatuhTempo']);
    Route::get('/informasi-kos/pemasukan/{userId}', [PemasukanController::class, 'pemasukanBulanan']);
    Route::get('/informasi-kos/pengeluaran/{userId}', [PengeluaranController::class, 'pengeluaranBulanan']);
    Route::post('/informasi-kos/update_lanjut/{penyewaId}', [PenyewaController::class, 'lanjutSewa']);
    Route::post('/informasi-kos/update_tidak/{penyewaId}', [PenyewaController::class, 'tidakLanjutSewa']);
});

// Routes for Gedung
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/gedung/{userId}', [GedungController::class, 'gedungByPemilik']);
    Route::post('/tambah-gedung/{userId}', [GedungController::class, 'tambahGedung']);
    Route::post('/edit-gedung/{id_gedung}', [GedungController::class, 'updateGedung']);
    Route::delete('/gedung/{id}', [GedungController::class, 'hapusGedung']);
});

// Routes for Kamar
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/kamar/{id_gedung}', [KamarController::class, 'kamarByGedung']);
    Route::get('/kamar/detail/{id_kamar}', [KamarController::class, 'getKamar']);
    Route::post('/kamar/insert', [KamarController::class, 'tambahKamar']);
    Route::post('/kamar/update/{id_kamar}', [KamarController::class, 'updateKamar']);
    Route::delete('/kamar/delete/{id_kamar}', [KamarController::class, 'hapusKamar']);
    Route::get('/kamar-kosong', [KamarController::class, 'getListKosong']);
    Route::get('/kamar-kosong/{id_pemilik}', [KamarController::class, 'getListKamarKosong']);
});

// Routes for Fasilitas Umum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fasilitas-umum/{id_gedung}', [FasilitasUmumController::class, 'fasilitasByGedung']);
    Route::post('/fasilitas-umum/insert', [FasilitasUmumController::class, 'tambahFasilitasUmum']);
    Route::post('/fasilitas-umum/update/{id_fasilitas}', [FasilitasUmumController::class, 'updateFasilitasUmum']);
    Route::delete('/fasilitas-umum/delete/{id_fasilitas}', [FasilitasUmumController::class, 'hapusFasilitasUmum']);
});

// Routes for Fasilitas Kamar
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fasilitas-kamar/{id_kamar}', [FasilitasKamarController::class, 'fasilitasByKamar']);
    Route::get('/fasilitas-kamar-v2/{id_gedung}', [FasilitasKamarController::class, 'fasilitasKamarV2']);
    Route::post('/fasilitas-kamar/insert', [FasilitasKamarController::class, 'tambahFasilitasKamar']);
    Route::post('/fasilitas-kamar/update/{id_fasilitas_kamar}', [FasilitasKamarController::class, 'updateFasilitasKamar']);
    Route::delete('/fasilitas-kamar/delete/{id_fasilitas_kamar}', [FasilitasKamarController::class, 'hapusFasilitasKamar']);
});

// Routes for Fasilitas
Route::get('/fasilitas', [FasilitasController::class, 'getAllFasilitas']);

// Routes for Penyewa
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tambah-penyewa', [PenyewaController::class, 'tambahPenyewa']);
    Route::get('/kelola-penyewa/{userId}', [PenyewaController::class, 'getPenyewa']);
    Route::get('/penyewa/{id_penyewa}', [PenyewaController::class, 'detailPenyewa']);
    Route::delete('/penyewa/{id_penyewa}', [PenyewaController::class, 'hapusPenyewa']);
    Route::post('/edit-penyewa/{id_penyewa}', [PenyewaController::class, 'updatePenyewa']);
});

// Laporan
Route::get('/laporan/pemasukan/{userId}', [PemasukanController::class, 'getPemasukan']);
Route::get('/laporan/pengeluaran/{userId}', [PengeluaranController::class, 'getPengeluaran']);

