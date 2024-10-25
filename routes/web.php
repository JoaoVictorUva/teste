<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatoController;

Route::get('/', [CandidatoController::class, 'index']);