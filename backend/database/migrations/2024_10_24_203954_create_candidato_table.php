<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatoTable extends Migration
{

    public function up()
    {
        Schema::create('candidatos', function (Blueprint $table) {
            $table->id('id_candidato');  
            $table->unsignedBigInteger('id_raca');  
            $table->unsignedBigInteger('id_estado_civil');  
            $table->unsignedBigInteger('id_cidade');  
            $table->unsignedBigInteger('id_nascimento_pais');  
            $table->unsignedBigInteger('id_estado_nascimento');  
            $table->unsignedBigInteger('id_nascimento_cidade');  
            $table->string('nome_completo');  
            $table->char('sexo', 1);  
            $table->boolean('deficiencia');  
            $table->string('nome_pai');  
            $table->string('nome_mae');  
            $table->string('endereco');  
            $table->string('bairro');  
            $table->string('cep');  
            $table->string('telefone');  
            $table->string('email');  
            $table->string('nacionalidade');  
            $table->string('cpf');  
            $table->string('rg');  
            $table->date('data_expedicao');  
            $table->string('orgao_expeditor');  
            $table->string('uf_expedicao');  
            $table->string('escolaridade');  

       
        });
    }

    public function down()
    {
        Schema::dropIfExists('candidatos');
    }
}
