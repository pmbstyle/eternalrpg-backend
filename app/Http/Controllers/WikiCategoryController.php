<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\WikiCategory;

class WikiCategoryController extends Controller
{
    public function getAllWikiCategories() {
        $categories = WikiCategory::get()->toJson(JSON_UNESCAPED_UNICODE);
        return response($categories, 200);
    }
    public function createWikiCategory(Request $request) {
        $validator = Validator::make($request->all(), [
            'name_en' => 'required',
            'slug' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }
        $category = new WikiCategory;
        $category->name_en = $request->name_en;
        $category->name_ru = !is_null($request->name_ru) ? $request->name_ru : '';
        $category->slug = $request->slug;
        $category->save();
        return response()->json([
            "message" => "new wiki category created"
        ], 201);
    }

    public function getWikiCategory($id) {
        if (WikiCategory::where('id', $id)->exists()) {
            $category = WikiCategory::with('wikiposts','wikiposts')->where('id', $id)->get();
            return response($category[0], 200);
        } else {
            return response()->json([
                "message" => "wiki category not found"
            ], 404);
        }
    }

    public function updateWikiCategory(Request $request, $id) {
        if (WikiCategory::where('id', $id)->exists()) {
            $category = WikiCategory::find($id);
            $category->name_en = is_null($request->name_en) ? $category->name_en : $request->name_en;
            $category->name_ru = is_null($request->name_ru) ? $category->name_ru : $request->name_ru;
            $category->slug = is_null($request->slug) ? $category->slug : $request->slug;
            $category->save();
            return response()->json([
                "message" => "records updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "category not found"
            ], 404);
        }
    }

    public function deleteWikiCategory($id) {
        if(WikiCategory::where('id', $id)->exists()) {
            $category = WikiCategory::find($id);
            $category->delete();
            return response()->json([
              "message" => "records deleted"
            ], 202);
        } else {
            return response()->json([
              "message" => "category not found"
            ], 404);
        }
    }
}
