<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/user', function() {
    $user = \Illuminate\Support\Facades\Auth::user();

    if($user) {
        return response(['user' => $user]);
    } else {
        return response(['error' => 'Not logged in']);
    }
})->middleware('auth:api');

Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login');

Route::get('/users', 'App\Http\Controllers\UserController@Users');

Route::get('/pages', 'App\Http\Controllers\PageController@index'); // Returns all created pages.
