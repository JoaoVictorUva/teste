<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelecoesTable extends Migration
{
    public function up()
    {
        Schema::create('selecoes', function (Blueprint $table) {
            $table->id('selecao_id'); 
            $table->string('titulo', 255);  
            $table->string('edital'); 
            $table->text('informacoes_gerais');
            $table->date('inscricao_inicio');
            $table->date('inscricao_fim');  
            $table->boolean('exibir_edital');
            $table->boolean('exibir_resultado_inscricao');
            $table->boolean('finalizado');  
            $table->text('resultado');  
            $table->timestamps();  
        });
    }


    public function down()
    {
        Schema::dropIfExists('selecaos');
    }
}
