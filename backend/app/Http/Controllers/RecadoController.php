<?php

namespace App\Http\Controllers;

use App\Models\Recado;
use Illuminate\Http\Request;

class RecadoController extends Controller
{
    public function index(Request $request)
    {
        $recados = $request->user()
            ->recados()
            ->orderByDesc('created_at')
            ->get();

        return response()->json($recados);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'texto'  => 'required|string',
        ]);

        $recado = $request->user()->recados()->create([
            'titulo' => $request->titulo,
            'texto'  => $request->texto,
        ]);

        return response()->json($recado, 201);
    }

    public function destroy(Request $request, Recado $recado)
    {
        if ($recado->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Não autorizado.'], 403);
        }

        $recado->delete();

        return response()->json(['message' => 'Recado excluído.']);
    }
}