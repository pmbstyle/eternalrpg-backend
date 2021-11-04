<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\WikiCategoryController;
use App\Http\Controllers\WikiPostController;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Wiki Categories
Route::post('/wiki-category', [WikiCategoryController::class, 'createWikiCategory']);
Route::post('/wiki-category/{id}', [WikiCategoryController::class, 'updateWikiCategory']);
Route::delete('/wiki-category/{id}', [WikiCategoryController::class, 'deleteWikiCategory']);
Route::get('/wiki-categories', [WikiCategoryController::class, 'getAllWikiCategories']);
Route::get('/wiki-category/{id}', [WikiCategoryController::class, 'getWikiCategory']);

//Wiki Posts
Route::post('/wiki-post', [WikiPostController::class, 'createWikiPost']);
Route::post('/wiki-post/{id}', [WikiPostController::class, 'updateWikiPost']);
Route::delete('/wiki-post/{id}', [WikiPostController::class, 'deleteWikiPost']);
Route::get('/wiki-posts', [WikiPostController::class, 'getAllWikiPosts']);
Route::get('/wiki-post/{id}', [WikiPostController::class, 'getWikiPost']);

//News Posts
Route::post('/news', [NewsController::class, 'createNewsPost']);
Route::post('/news/{id}', [NewsController::class, 'updateNewsPost']);
Route::delete('/news/{id}', [NewsController::class, 'deleteNewsPost']);
Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/news/{id}', [NewsController::class, 'getNewsPost']);