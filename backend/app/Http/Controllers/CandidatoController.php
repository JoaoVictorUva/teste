<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidato;

class CandidatoController extends Controller
{
    public function index()
    {   
        $candidatos = Candidato::all(); 
        return response()->json([
            'candidatos' => $candidatos
        ]);       
    }

   
    public function store(Request $request)
    {
        

        // Validação dos dados recebidos
        $validacao = $request->validate([
            'id_raca' => 'required|integer',
            'id_estado_civil' => 'required|integer',
            'id_cidade' => 'required|integer',
            'id_nascimento_pais' => 'required|integer',
            'id_estado_nascimento' => 'required|integer',
            'id_nascimento_cidade' => 'required|integer',
            'nome_completo' => 'required|string|max:255',  
            'sexo' => 'required|in:M,F',  
            'deficiencia' => 'required|boolean',  
            'nome_pai' => 'nullable|string|max:255',  
            'nome_mae' => 'nullable|string|max:255',  
            'endereco' => 'required|string|max:255',  
            'bairro' => 'required|string|max:255',  
            'cep' => 'required|integer',  
            'telefone' => 'required|integer',  
            'email' => 'required|email|max:255',  
            'nacionalidade' => 'required|string|max:100',  
            'cpf' => 'required|integer',  
            'rg' => 'required|integer',  
            'data_expedicao' => 'required|date',  
            'orgao_expeditor' => 'required|string|max:100',  
            'uf_expedicao' => 'required|string|max:2',  
            'escolaridade' => 'required|string|max:100',  
        ]);

        // Criação do novo candidato com os dados validados
        $candidato = Candidato::create($validacao);

        // Retorne uma resposta de sucesso
        return response()->json([
            'success' => true,
            'message' => 'Candidato cadastrado com sucesso!',
            'candidato' => $candidato,
        ]);
    }
    

    
    // Método para excluir um candidato
    public function destroy($id)
    {
        $candidato = Candidato::where('id_candidato', $id)->firstOrFail();
        $candidato->delete();

        return response()->json(['message' => 'Candidato excluído com sucesso!']);
        
    }

    public function show($id)
    {
        $candidato = Candidato::where('id_candidato', $id)->first();
        return response()->json([
            'candidato' => $candidato
        ]);
    }

    public function update(Request $request, $id)
    {
        $candidato = Candidato::where('id_candidato', $id)->firstOrFail();
        $candidato->update($request->all());

        return response()->json([
            'successCandidato' => 'Candidato atualizado com sucesso!'
        ]);
    }

}
