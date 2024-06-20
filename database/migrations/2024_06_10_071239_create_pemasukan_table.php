<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('pemasukan', function (Blueprint $table) {
            $table->id('id_pemasukan');
            $table->$table->foreignId('id_penyewa')->constrained('penyewa')->onDelete('cascade');
            $table->decimal('biaya_pemasukan', 10, 2);
            $table->date('tgl_pemasukan');
            $table->string('keterangan');
            $table->timestamps();

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('pemasukan');
    }
};
