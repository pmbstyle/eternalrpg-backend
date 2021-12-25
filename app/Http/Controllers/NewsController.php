<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Storage;

use App\Models\News;

class NewsController extends Controller
{
    public function getAllNews(Request $request) {

        $posts = News::orderBy('created_at', 'desc')->paginate(5);
        
        return response($posts, 200);
    }

    public function getNewsPost($id) {
        if (News::where('id', $id)->exists()) {
            $post = News::where('id', $id)->first();
            return response($post, 200);
        } else {
            return response()->json([
                "message" => "post not found"
            ], 404);
        }
    }

    public function createNewsPost(Request $request) {
        $validator = Validator::make($request->all(), [
            'title_en' => 'required',
            'title_ru' => 'required',
            'description_en' => 'required',
            'description_ru' => 'required',
            'full_text_en' => 'required',
            'full_text_ru' => 'required',
            'slug' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }
        $post = new News;
        $post->title_en = $request->title_en;
        $post->title_ru = $request->title_ru;
        $post->description_en = $request->description_en;
        $post->description_ru = $request->description_ru;
        $post->full_text_en = $request->full_text_en;
        $post->full_text_ru = $request->full_text_ru;
        $post->slug = $request->slug;
        if(!is_null($request->image)) {
            $post->image = $request->image;
        }

        $post->save();
        return response()->json([
            "message" => "news post created"
        ], 201);
    }

    public function updateNewsPost(Request $request) {
        if (News::where('id', $request->id)->exists()) {
            $post = News::find($request->id);
            $post->title_en = is_null($request->title_en) ? $post->title_en : $request->title_en;
            $post->title_ru = is_null($request->title_ru) ? $post->title_ru : $request->title_ru;
            $post->slug = is_null($request->slug) ? $post->slug : $request->slug;
            $post->description_en = is_null($request->description_en) ? $post->description_en : $request->description_en;
            $post->description_ru = is_null($request->description_ru) ? $post->description_ru : $request->description_ru;
            $post->full_text_en = is_null($request->full_text_en) ? $post->full_text_en : $request->full_text_en;
            $post->full_text_ru = is_null($request->full_text_ru) ? $post->full_text_ru : $request->full_text_ru;
            if(!is_null($request->image)) {
                $post->image = $request->image;
            }

            $post->save();
            return response()->json([
                "message" => "records updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "news post not found"
            ], 404);
        }
    }

    public function deleteNewsPost($id) {
        if(News::where('id', $id)->exists()) {
            $post = News::find($id);
            $post->delete();
            return response()->json([
              "message" => "records deleted"
            ], 202);
        } else {
            return response()->json([
              "message" => "news post not found"
            ], 404);
        }
    }
}
