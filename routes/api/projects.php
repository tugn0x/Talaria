<?php

use Illuminate\Http\Request;

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
    'namespace' => 'Projects',
    'prefix' => 'projects',
    'middleware' => ['api','auth:api',],
//    'middleware' => 'api',
    'as' => 'api.v1.projects.',
], function () {
    Route::get('', 'ProjectController@index')->name('index');
    Route::put('{id}', 'ProjectController@update')->name('update');
    Route::post('project', 'ProjectController@store')->name('store');

});
