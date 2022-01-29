<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ServerManager;
use App\Models\ServerStatusManager;

class ServerStatusManagerController extends Controller
{
    public function getServerStats($id,$period) {
        if (ServerManager::where('id', $id)->exists()) {
            $stats = ServerStatusManager::where('server_id',$id)->whereBetween('created_at', [now()->subMinutes($period), now()])->select('players','created_at')->get();
            return response()->json($stats, 200);
        } else {
            return response()->json([
                "message" => "server found"
            ], 404);
        }
    }
}
