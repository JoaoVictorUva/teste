<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidato;
use App\Models\Cidade;
use App\Models\Raca;
class CandidatoController extends Controller
{
    public function index()
    {   
        echo "Cidades: <br>";
        $cidades = Cidade::all();
        $informacoesCidades = $cidades->map(function ($cidade) {
            return "ID: " . $cidade->cidade_id . ", Nome: " . $cidade->cidade ;
        })->implode('<br>');
        echo $informacoesCidades;

        echo "<br><br>";

        echo "Racas: <br>";
        $racas = Raca::all();
        $informacoesRacas = $racas->map(function ($raca) {
            return "ID: " . $raca->raca_id . ", Nome: " . $raca->raca ;
        })->implode('<br>');
        echo $informacoesRacas;

        echo "<br>";

        echo "<br>Candidatos:<br>";
        $usuarios = Candidato::with(['cidade', 'raca'])->get();

        $informacoesUsuarios = $usuarios->map(function ($usuario) {
            return "ID: " . $usuario->id . ", Nome: " . $usuario->nome . ", Cidade: " . $usuario->cidade->cidade . ", Raça: " . $usuario->raca->raca;
        })->implode('<br>'); 
        echo $informacoesUsuarios;

    }
}
