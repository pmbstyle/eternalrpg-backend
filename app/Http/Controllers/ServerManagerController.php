<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\ServerManager;

class ServerManagerController extends Controller
{
    public function getAllServers(Request $request) {

        $servers = ServerManager::orderBy('created_at', 'desc')->get();
        
        return response($servers, 200);
    }

    public function getServer($id) {
        if (ServerManager::where('id', $id)->exists()) {
            $server = ServerManager::where('id', $id)->first();
            return response($server, 200);
        } else {
            return response()->json([
                "message" => "server found"
            ], 404);
        }
    }

    public function createNewServer(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'ip' => 'required',
            'port' => 'required',
            'status' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }
        $server = new ServerManager;
        $server->name = $request->name;
        $server->ip = $request->ip;
        $server->port = $request->port;
        $server->status = $request->status;


        $server->save();
        return response()->json([
            "message" => "a server has been created"
        ], 201);
    }

    public function updateServer(Request $request) {
        if (ServerManager::where('id', $request->id)->exists()) {
            $server = ServerManager::find($request->id);
            $server->name = is_null($request->name) ? $server->name : $request->name;
            $server->ip = is_null($request->ip) ? $server->ip : $request->ip;
            $server->port = is_null($request->port) ? $server->port : $request->port;
            $server->status = is_null($request->status) ? $server->status : $request->status;

            $server->save();
            return response()->json([
                "message" => "server updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "server not found"
            ], 404);
        }
    }

    public function deleteServer($id) {
        if(ServerManager::where('id', $id)->exists()) {
            $server = ServerManager::find($id);
            $server->delete();
            return response()->json([
              "message" => "server deleted"
            ], 202);
        } else {
            return response()->json([
              "message" => "server not found"
            ], 404);
        }
    }
}
