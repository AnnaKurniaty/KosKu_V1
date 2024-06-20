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
        Schema::create('gedung', function (Blueprint $table) {
            $table->id('id_gedung'); // Primary Key
            $table->foreignId('id_pemilik')->constrained('users')->onDelete('cascade'); // Foreign Key, assuming 'users' table exists
            $table->string('nama_gedung', 255); // Nama Gedung
            $table->integer('jumlah_kamar'); // Jumlah Kamar
            $table->string('gambar_gedung', 255); // Gambar Gedung
            $table->timestamps(); // Timestamps (created_at, updated_at)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gedung');
    }
};
