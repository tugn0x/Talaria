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
    Route::get('option-items', 'ProjectController@optionList')->name('option-items');
    Route::put('{id}', 'ProjectController@update')->where('id', '[0-9]+')->name('update');
    Route::get('{id}', 'ProjectController@show')->where('id', '[0-9]+')->name('show');
    Route::post('', 'ProjectController@create')->name('create');

});
