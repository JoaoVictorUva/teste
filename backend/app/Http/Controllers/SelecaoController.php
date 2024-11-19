<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Selecao;
use App\Models\Vagas;

class SelecaoController extends Controller
{
    public function index()
    {   
        $selecao = Selecao::all();
        return response()->json([
            'selecao' => $selecao
        ]);

    }


    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'edital' => 'required|file|mimes:pdf|max:10240', // Limita o arquivo a 10MB
            'informacoes_gerais' => 'required|string',
            'inscricao_inicio' => 'required|date',
            'inscricao_fim' => 'required|date',
            'resultado' => 'required|string',
            'exibir_edital' => 'boolean',
            'exibir_resultado_inscricao' => 'boolean',
            'finalizado' => 'boolean',
        ]);

        $data = $request->only([
            'titulo', 'informacoes_gerais', 'inscricao_inicio', 'inscricao_fim', 'resultado', 
            'exibir_edital', 'exibir_resultado_inscricao', 'finalizado'
        ]);

        // Salva o arquivo PDF
        if ($request->hasFile('edital')) {
            $data['edital'] = $request->file('edital')->storeAs('editais', $request->file('edital')->getClientOriginalName(), 'public');
        }

        // Armazena os dados no banco de dados
        Selecao::create($data);

        return response()->json(['message' => 'Cadastro realizado com sucesso.']);
    }

    public function destroy($id)
    {
        $selecao = Selecao::where('selecao_id', $id)->firstOrFail();

        // Verifique se a vaga associada à seleção está excluída
        $vaga = Vagas::where('selecao_id', $selecao->selecao_id)->first();

        if ($vaga) {
            return response()->json(['error' => 'A seleção só pode ser excluída se a vaga associada estiver excluída.'], 200);
        }else{
            $selecao->delete();
        }

        return response()->json(['success' => 'Seleção excluída com sucesso.']);

    }

    public function show($id)
    {
        $selecao = Selecao::where('selecao_id', $id)->firstOrFail();
        return response()->json([
            'selecao' => $selecao
        ]);
    }

    public function update(Request $request, $id)
    {   
        //dd($request->all());
        $selecao = Selecao::where('selecao_id', $id)->firstOrFail();

        $selecao->titulo = $request->titulo; 
        $selecao->informacoes_gerais = $request->informacoes_gerais; 
        $selecao->inscricao_inicio = $request->inscricao_inicio; 
        $selecao->inscricao_fim = $request->inscricao_fim; 
        $selecao->resultado = $request->resultado; 
        $selecao->exibir_edital = $request->exibir_edital; 
        $selecao->exibir_resultado_inscricao = $request->exibir_resultado_inscricao; 
        $selecao->finalizado = $request->finalizado; 
        $selecao->edital = $request->file('edital')->storeAs('editais', $request->file('edital')->getClientOriginalName(), 'public');
        
        $selecao->save();

    }

        

   
}
