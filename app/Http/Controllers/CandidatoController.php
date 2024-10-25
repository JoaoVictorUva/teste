<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidato;
class CandidatoController extends Controller
{
    public function index()
    {

        $usuarios = Candidato::with(['cidade', 'raca'])->get();

        $informacoesUsuarios = $usuarios->map(function ($usuario) {
            return "ID: " . $usuario->id . ", Nome: " . $usuario->nome . ", Cidade: " . $usuario->cidade->cidade . ", Raça: " . $usuario->raca->raca;
        })->implode('<br>'); // Junta todas as informações em uma única string com quebras de linha
    
        echo $informacoesUsuarios;

    }
}
