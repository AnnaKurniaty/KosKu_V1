<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penyewa', function (Blueprint $table) {
            $table->id('id_penyewa');
            $table->foreign('id_kamar')->references('id_kamar')->on('kamar');
            $table->string('nama_penyewa');
            $table->string('alamat_penyewa');
            $table->string('nomor_telepon');
            $table->string('no_pj_penyewa');
            $table->date('tgl_mulai_sewa');
            $table->date('tgl_akhir_sewa');
            $table->string('status_penyewa');
            $table->string('foto_ktp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyewa');
    }
};
