<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vagas;
use App\Models\Selecao;

class VagaController extends Controller
{
    public function index()
    {
        $vagas = Vagas::with('selecao')->get();
        
        return response()->json([
            'vagas' => $vagas
        ]);
    }

    public function create()
    {
        $selecoes = Selecao::all();

        return response()->json([
            'selecoes' => $selecoes
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'selecao_id' => 'required', 
            'cargo_id' => 'required',
            'curso_id' => 'required',
            'area_id' => 'required',
            'tipo_concorrencia' => 'required',
            'valor_inscricao' => 'required',
            'total_vagas' => 'required',
            'descricao' => 'required',
        ]);

        $vaga = new Vagas();
        $vaga->selecao_id = $request->selecao_id;
        $vaga->cargo_id = $request->cargo_id;
        $vaga->curso_id = $request->curso_id;
        $vaga->area_id = $request->area_id;
        $vaga->tipo_concorrencia = $request->tipo_concorrencia;
        $vaga->valor_inscricao = $request->valor_inscricao;
        $vaga->total_vagas = $request->total_vagas;
        $vaga->descricao = $request->descricao;
        $vaga->save(); // Salva a vaga no banco de dados
    }

    public function destroy($id)
    {
        $vaga = Vagas::where('vaga_id', $id)->first();
        $vaga->delete();

        return response()->json(['message' => 'Vaga excluída com sucesso!']);
        
    }

    public function show($id)
    {
        $vaga = Vagas::with('selecao')->where('vaga_id', $id)->first();
        return response()->json([
            'vaga' => $vaga
        ]);
    }

    public function update(Request $request, $id)
    {   
        
        $vaga = Vagas::where('vaga_id', $id)->first();


        $vaga->selecao_id = $request->selecao_id;
        $vaga->cargo_id = $request->cargo_id;
        $vaga->curso_id = $request->curso_id;
        $vaga->area_id = $request->area_id;
        $vaga->tipo_concorrencia = $request->tipo_concorrencia;
        $vaga->valor_inscricao = $request->valor_inscricao;
        $vaga->total_vagas = $request->total_vagas;
        $vaga->descricao = $request->descricao;
        $vaga->save(); // Salva a vaga no banco de dados

        return response()->json([
            'vaga' => 'Vaga atualizada com sucesso!'
        ]);
    }

}
