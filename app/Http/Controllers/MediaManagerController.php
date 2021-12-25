<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MediaManager;
use Image;
use Illuminate\Support\Facades\Storage;

class MediaManagerController extends Controller
{
    public function mediaGet(Request $request) {
        if(isset($request->type)) {
            $media = MediaManager::where('type', $request->type)->orderBy('created_at', 'desc')->paginate(20);
        } else {
            $media = MediaManager::orderBy('created_at', 'desc')->paginate(20);
        }
        
        return response($media, 200);
    }

    public function mediaCreate(Request $request) {
        if(!is_null($request->image)) {
            $image = $request->image;
            $media = new MediaManager;
            $destinationPath = 'public/'.$request->type.'s';
            $mediaUploaded = Storage::put($destinationPath, $image);
            $mediaFileName = basename($mediaUploaded);
            $mediaPath = Storage::path($mediaUploaded);
            $media->image_url = Storage::url($mediaUploaded);
            $img = Image::make($mediaPath);
            $imgPath = pathinfo($mediaPath, PATHINFO_DIRNAME);
            $img->resize(100, 100, function ($constraint) {
                $constraint->aspectRatio();
            })->save($imgPath.'/thumb_'.$mediaFileName);
            $media->image_thumb_url = '/storage/'.$request->type.'s/thumb_'.$mediaFileName;
            $media->type = $request->type.'s';
            $media->save();
            return response()->json([
                "image" => $media,
                "message" => "media was created"
            ], 201);
        } else {
            return response()->json([
                "message" => "image must be set"
            ], 422);
        }
    }

    public function mediaDelete(Request $request) {
        $media = MediaManager::find($request->id);
        $media_name = basename($media->image_url);
        $media_thumb = basename($media->image_thumb_url);
        Storage::disk('public')->delete($media->type.'/'.$media_name);
        Storage::disk('public')->delete($media->type.'/'.$media_thumb);
        $media->delete();
        return response()->json('files was deleted');
    }
}
