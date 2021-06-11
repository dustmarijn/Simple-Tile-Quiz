<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{all}', function () {
    return view('welcome');
})->where('all', '^(?!login|admin|register|dashboard|home|user|logout).*$');

Route::get('/admin/{any?}/{all?}/{all2?}', function() {
    return view('/admin');
})->where('all', '.*')->where('all2', '.*');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/logout', function () {
   Auth::logout();

   return redirect()->to('/admin');
});
