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
    'namespace' => 'Institutions',
    'prefix' => 'institutions',
    'middleware' => ['api','auth:api',],
//    'middleware' => 'api',
    'as' => 'api.v1.institutions.',
], function () {
//    Route::get('/', 'LibraryController@test')->name('test');
    Route::get('consortia', 'ConsortiumController@index')->name('index');
    Route::put('consortia/{Consortium}', 'ConsortiumController@update')->name('update');
    Route::post('consortia', 'ConsortiumController@store')->name('store');
});
