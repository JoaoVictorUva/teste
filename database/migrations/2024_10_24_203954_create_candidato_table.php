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
        // Use a conexão do banco de dados 'mysql' para a tabela 'candidato'
        Schema::connection('mysql')->create('candidato', function (Blueprint $table) {
            $table->id(); // Chave primária com auto incremento
            $table->string('nome', 100);
            $table->unsignedBigInteger('id_cidade');
            $table->unsignedBigInteger('id_raca');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cidades');
    }
};
