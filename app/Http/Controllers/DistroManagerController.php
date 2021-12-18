<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DistroManager;
use Illuminate\Support\Facades\Storage;

class DistroManagerController extends Controller
{
    public function getAllDistros(Request $request) {

        $distros = DistroManager::get()->all();
        
        return response($distros, 200);
    }

    public function updateDistro(Request $request) {
        if(DistroManager::where('id', $request->id)->exists()) {
            $distro = DistroManager::find($request->id);
            $distro->client_version = $request->client_version;
            $distro->client_folder = $request->client_folder;
            $distro->java_version = $request->java_version;
            $distro->java_folder_win = $request->java_folder_win;
            $distro->java_folder_mac = $request->java_folder_mac;
            $distro->java_folder_lin = $request->java_folder_lin;
            $distro->delivery = $request->delivery;
            $distro->save();
            $json = $distro;
            unset($json->id);
            unset($json->created_at);
            unset($json->updated_at);
            Storage::url(Storage::put('public/distro/'.$distro->status.'/distro.json', json_encode($json)));
            return response()->json([
                "message" => "distro updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "distro not found"
            ], 404);
        }
    }
}
