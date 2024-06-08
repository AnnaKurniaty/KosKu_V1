<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KelolaPenyewaController;
use App\Http\Controllers\KelolaGedungFasilitasController;
use App\Http\Controllers\LaporanController;

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

Route::get('/dashboard/{userId}', [DashboardController::class, 'informasiKos']);
Route::post('/dashboard/pemasukan/{penyewaId}', [DashboardController::class, 'storePemasukan']);
Route::patch('/dashboard/penyewa/status/{penyewaId}', [DashboardController::class, 'updatePenyewaStatus']);
Route::get('/kamar/{id_gedung}', [KelolaGedungFasilitasController::class, 'kamarByGedung']);
Route::get('/fasilitas umum/{id_gedung}', [KelolaGedungFasilitasController::class, 'fasilitasUmumByGedung']);
Route::get('/fasilitas kamar/{id_gedung}', [KelolaGedungFasilitasController::class, 'fasilitasKamarByGedung']);

//GEDUNG
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/gedung/{userId}', [KelolaGedungFasilitasController::class, 'gedungByPemilik']);
    Route::post('/tambah-gedung/{userId}', [KelolaGedungFasilitasController::class, 'tambahGedung']);
    Route::post('/edit-gedung/{id_gedung}', [KelolaGedungFasilitasController::class, 'updateGedung']);
    Route::delete('/gedung/{id_gedung}', [KelolaGedungFasilitasController::class, 'hapusGedung']);
});

//Fasilitas
// Route::get('/fasilitas-kamar', [KelolaGedungFasilitasController::class, 'gedungByPemilik']);
Route::post('/fasilitas-kamar/insert', [KelolaGedungFasilitasController::class, 'tambahFasilitasKamar']);
// Route::post('/edit-gedung/{id_gedung}', [KelolaGedungFasilitasController::class, 'updateGedung']);
// Route::delete('/gedung/{id_gedung}', [KelolaGedungFasilitasController::class, 'hapusGedung']);

Route::post('/tambah penyewa', [KelolaPenyewaController::class, 'tambahPenyewa']);
Route::get('/kelola penyewa/{userId}', [KelolaPenyewaController::class, 'kelolaPenyewa']);
Route::get('/penyewa/{id_penyewa}', [KelolaPenyewaController::class, 'detailPenyewa']);
Route::put('/penyewa/update status/{id_penyewa}/{status}', [KelolaPenyewaController::class, 'updateStatusPenyewa']);
Route::delete('/penyewa/{id_penyewa}', [KelolaPenyewaController::class, 'hapusPenyewa']);
Route::post('/tambah fasilitas', [KelolaGedungFasilitasController::class, 'tambahFasilitas']);
Route::get('/laporan/{userId}', [LaporanController::class, 'laporan']);

