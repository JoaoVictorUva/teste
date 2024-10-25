<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    protected $connection = 'mysql_teste'; // Nome da conexão definida no config/database.php
    protected $table = 'cidade'; // Nome da tabela no segundo banco
}
