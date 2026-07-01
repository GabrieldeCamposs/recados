<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecadoController;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::get('/recados',             [RecadoController::class, 'index']);
    Route::post('/recados',            [RecadoController::class, 'store']);
    Route::delete('/recados/{recado}', [RecadoController::class, 'destroy']);
});