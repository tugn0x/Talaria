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
    'namespace' => 'Users',
    'prefix' => 'labels',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.labels.',
], function () {
    Route::get('my', 'LabelController@my')->name('my');
    Route::get('', 'LabelController@index')->name('index');
    Route::get('option-items', 'LabelController@optionList')->name('option-items');
    Route::get('{id}', 'LabelController@show')->name('show');
    Route::put('{id}', 'LabelController@update')->name('update');
    Route::post('', 'LabelController@store')->name('create');
});
