<?php

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

//Route::get('/', function () {
//    return view('welcome');
//});

//Route::get('/home', 'HomeController@index')->name('home');


Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
Route::get('auth/social/facebook', 'Auth\SocialAuthController@redirectToProvider');
//Route::get('auth/social/{provider}', 'Auth\SocialAuthController@redirectToProvider');
Route::get('auth/social/{provider}/callback', 'Auth\SocialAuthController@handleProviderCallback');


//Route::get('auth/social/{provider}', 'Auth\AuthController@redirectToProvider');
//Route::get('auth/social/{provider}/callback', 'Auth\AuthController@handleProviderCallback');
