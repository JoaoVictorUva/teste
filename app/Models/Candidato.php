<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{
    protected $connection = 'mysql';
    protected $table = 'candidato'; 

    public function cidade()
    {
        return $this->belongsTo(Cidade::class, 'id_cidade', 'cidade_id');
    }

    public function raca()
    {
        return $this->belongsTo(Raca::class, 'id_raca', 'raca_id');
    }
}
