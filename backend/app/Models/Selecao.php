<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Selecao extends Model
{
    protected $table = 'selecoes'; // Nome da tabela no segundo banco
    protected $primaryKey = 'selecao_id';

    // Definindo os campos que são permitidos para mass-assignment
    protected $fillable = [
        'titulo',
        'edital',
        'informacoes_gerais',
        'inscricao_inicio',
        'inscricao_fim',
        'exibir_edital',
        'exibir_resultado_inscricao',
        'finalizado',
        'resultado',
    ];
}
