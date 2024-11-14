<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vagas extends Model
{
    protected $table = 'vagas'; // Nome da tabela no segundo banco
    public $timestamps = false;
    protected $primaryKey = 'vaga_id';

    // Definindo os campos que são permitidos para mass-assignment
    protected $fillable = [
        'selecao_id',
        'cargo_id',
        'curso_id',
        'area_id',
        'tipo_concorrencia',
        'valor_incricao',
        'total_vagas',
        'descricao',
    ];

    public function selecao()
    {
        return $this->belongsTo(Selecao::class, 'selecao_id', 'selecao_id');
    }
}
