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
        Schema::create('pengeluaran', function (Blueprint $table) {
            $table->id('id_pengeluaran');
            $table->foreignId('id_fasilitas_umum')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_fasilitas_kamar')->constrained('users')->onDelete('cascade');
            $table->decimal('biaya_pengeluaran', 10, 2);
            $table->date('tgl_pengeluaran');
            $table->string('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengeluaran');
    }
};
