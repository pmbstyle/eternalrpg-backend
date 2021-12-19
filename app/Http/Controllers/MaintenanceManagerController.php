<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaintenanceManager;

class MaintenanceManagerController extends Controller
{
    public function getMaintenance(Request $request) {

        $m = MaintenanceManager::get()->first();
        
        return response($m, 200);
    }

    public function updateMaintenance(Request $request) {
        $m = MaintenanceManager::find($request->id);
        $m->status = $request->status;
        $m->description = $request->description;
        $m->save();
        return response()->json([
            "message" => "Maintenance status updated successfully"
        ], 200);
    }
}
