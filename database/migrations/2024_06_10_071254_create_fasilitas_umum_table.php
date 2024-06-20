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
        Schema::create('fasilitas_umum', function (Blueprint $table) {
            $table->id('id_fasilitas_umum');
            $table->foreign('id_gedung')->references('id_gedung')->on('gedung');
            $table->foreign('id_fasilitas')->references('id_fasilitas')->on('fasilitas');
            $table->integer('jumlah_fasilitas');
            $table->date('tanggal_pembelian');
            $table->decimal('biaya_pembelian', 10, 2);
            $table->decimal('biaya_pengeluaran', 10, 2);
            $table->date('tanggal_pengeluaran');
            $table->string('gambar_fasilitas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fasilitas_umum');
    }
};
