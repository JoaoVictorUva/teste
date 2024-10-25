<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Raca extends Model
{
    protected $connection = 'mysql_teste'; // Nome da conexão definida no config/database.php
    protected $table = 'raca'; // Nome da tabela no segundo banco
}
