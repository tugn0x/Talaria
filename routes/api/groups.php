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
    'namespace' => 'References',
    'prefix' => 'groups',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.groups.',
], function () {
    Route::get('my', 'GroupController@my')->name('my');
    Route::get('', 'GroupController@index')->name('index');
    Route::get('option-items', 'GroupController@optionList')->name('option-items');
    Route::get('{id}', 'GroupController@show')->name('show');
    Route::put('{id}', 'GroupController@update')->name('update');
    Route::post('', 'GroupController@store')->name('create');
});

