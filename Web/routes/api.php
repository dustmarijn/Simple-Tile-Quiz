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

Route::post('/createTile', 'App\Http\Controllers\TileController@create');
Route::post('/createPage', 'App\Http\Controllers\PageController@create');
Route::post('/createOrganisation', 'App\Http\Controllers\OrganisationController@create');

Route::post('/showPage', 'App\Http\Controllers\PageController@show');

Route::post('/editPage', 'App\Http\Controllers\PageController@update');
Route::post('/editOrganisation', 'App\Http\Controllers\OrganisationController@update');

Route::post('/deleteTile', 'App\Http\Controllers\TileController@destroy');
Route::post('/deleteOrganisation', 'App\Http\Controllers\OrganisationController@destroy');

Route::post('/ableToUseTile', 'App\Http\Controllers\TileController@ableToUseTile');

Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login');
Route::get('/logout', function() {
    \Illuminate\Support\Facades\Auth::logout();
});

Route::get('/users', 'App\Http\Controllers\UserController@Users');

Route::get('/pages', 'App\Http\Controllers\PageController@index'); // Returns all created pages.
Route::get('/organisations', 'App\Http\Controllers\OrganisationController@index'); // Returns all created organisations.
