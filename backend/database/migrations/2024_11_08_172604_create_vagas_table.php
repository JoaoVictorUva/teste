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
        Schema::create('vagas', function (Blueprint $table) {
            // Chave primária
            $table->id('vaga_id');  // Isso cria a coluna 'id_vaga' como chave primária

            // Relacoes entre tabelas
            $table->unsignedBigInteger('selecao_id');
            $table->unsignedBigInteger('cargo_id');
            $table->unsignedBigInteger('curso_id');
            $table->unsignedBigInteger('area_id');

            // Outros campos
            $table->string('tipo_concorrencia');  // Tipo de concorrência (varchar)
            $table->float('valor_inscricao');  // Valor de inscrição
            $table->integer('total_vagas');  // Total de vagas
            $table->string('descricao');  // Descrição

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas');
    }
};
