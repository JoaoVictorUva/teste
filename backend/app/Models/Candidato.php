<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{   
    protected $primaryKey = 'id_candidato';
    protected $table = 'candidatos'; 
    public $timestamps = false;

    // Permite a atribuição em massa dos seguintes campos
    protected $fillable = [
        'id_raca',
        'id_estado_civil',
        'id_cidade',
        'id_nascimento_pais',
        'id_estado_nascimento',
        'id_nascimento_cidade',
        'nome_completo',
        'sexo',
        'deficiencia',
        'nome_pai',
        'nome_mae',
        'endereco',
        'bairro',
        'cep',
        'telefone',
        'email',
        'nacionalidade',
        'cpf',
        'rg',
        'data_expedicao',
        'orgao_expeditor',
        'uf_expedicao',
        'escolaridade',
    ];
}

