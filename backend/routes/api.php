<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\SelecaoController;


Route::get('/candidatos', [CandidatoController::class, 'index']);
Route::get('/candidatos/{id}', [CandidatoController::class, 'show']);
Route::post('/candidatos/store', [CandidatoController::class, 'store']);
Route::delete('/candidatos/destroy/{id}', [CandidatoController::class, 'destroy']);
Route::put('/candidatos/update/{id}', [CandidatoController::class, 'update']);


Route::get('/selecao', [SelecaoController::class, 'index']);
Route::post('/selecao/store', [SelecaoController::class, 'store']);
Route::delete('/selecao/destroy/{id}', [SelecaoController::class, 'destroy']);
Route::get('/selecao/{id}', [SelecaoController::class, 'show']);
Route::post('/selecao/update/{id}', [SelecaoController::class, 'update']);


Route::get('/vaga', [VagaController::class, 'index']);
Route::get('/vaga/create', [VagaController::class, 'create']);
Route::post('/vaga/store',  [VagaController::class, 'store']);
Route::delete('/vaga/destroy/{id}', [VagaController::class, 'destroy']);
Route::get('/vaga/{id}', [VagaController::class, 'show']);
Route::put('/vaga/update/{id}', [VagaController::class, 'update']);
