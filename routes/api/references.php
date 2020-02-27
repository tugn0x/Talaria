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
    'prefix' => 'references',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.references.',
], function () {
    Route::get('my', 'ReferenceController@my')->name('my');
    Route::get('', 'ReferenceController@index')->name('index');
    Route::get('option-items', 'ReferenceController@optionList')->name('option-items');
    Route::get('{id}', 'ReferenceController@show')->name('show');
    Route::put('{id}', 'ReferenceController@update')->name('update');
    Route::post('', 'ReferenceController@store')->name('create');
});

