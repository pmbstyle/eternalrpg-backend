<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\WikiPost;
use App\Models\WikiCategory;

class WikiPostController extends Controller
{
    public function getAllWikiPosts(Request $request) {
        if(!isset($request->category) && $request->category == '') {
            $posts = WikiPost::select('id','name_ru','name_en','slug','wiki_category_id')->get()->toJson(JSON_UNESCAPED_UNICODE);
        } else {
            $posts = WikiPost::where('wiki_category_id', $request->category)->select('id','name_ru','name_en','slug','wiki_category_id')->get()->toJson(JSON_UNESCAPED_UNICODE);
        }
        
        return response($posts, 200);
    }

    public function createWikiPost(Request $request) {
        $validator = Validator::make($request->all(), [
            'name_en' => 'required',
            'slug' => 'required',
            'wiki_category_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }
        $post = new WikiPost;
        $post->name_en = $request->name_en;
        $post->name_ru = !is_null($request->name_ru) ? $request->name_ru : '';
        $post->slug = $request->slug;
        $post->wiki_category_id = $request->wiki_category_id;
        $post->description_en = !is_null($request->description_en) ? $request->description_en : '';
        $post->description_ru = !is_null($request->description_ru) ? $request->description_ru : '';
        $post->save();
        return response()->json([
            "message" => "new wiki post created"
        ], 201);
    }

    public function getWikiPost($id) {
        if (WikiPost::where('id', $id)->exists()) {
            $post = WikiPost::where('id', $id)->first();
            $related = WikiPost::where('wiki_category_id', '=', $post->wiki_category_id)->where('id', '!=', $post->id)->get();
            $post->related_posts = $related;
            return response($post, 200);
        } else {
            return response()->json([
                "message" => "post not found"
            ], 404);
        }
    }

    public function updateWikiPost(Request $request) {
        if (WikiPost::where('id', $request->id)->exists()) {
            $post = WikiPost::find($request->id);
            $post->name_en = is_null($request->name_en) ? $post->name_en : $request->name_en;
            $post->name_ru = is_null($request->name_ru) ? $post->name_ru : $request->name_ru;
            $post->slug = is_null($request->slug) ? $post->slug : $request->slug;
            $post->wiki_category_id = is_null($request->wiki_category_id) ? $post->wiki_category_id : $request->wiki_category_id;
            $post->description_en = is_null($request->description_en) ? $post->description_en : $request->description_en;
            $post->description_ru = is_null($request->description_ru) ? $post->description_ru : $request->description_ru;
            $post->save();
            return response()->json([
                "message" => "records updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "post not found"
            ], 404);
        }
    }

    public function deleteWikiPost($id) {
        if(WikiPost::where('id', $id)->exists()) {
            $post = WikiPost::find($id);
            $post->delete();
            return response()->json([
              "message" => "records deleted"
            ], 202);
        } else {
            return response()->json([
              "message" => "post not found"
            ], 404);
        }
    }
}
