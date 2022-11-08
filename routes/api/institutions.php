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
//    Route::get('/', 'InstitutionController@test')->name('test');
    Route::get('consortia', 'ConsortiumController@index')->name('index');
    //Route::put('consortia/{id}', 'ConsortiumController@update')->name('update');
    //Route::post('consortia', 'ConsortiumController@store')->name('store');


    Route::get('institution-types', 'InstitutionTypeController@index')->name('index');
    //Route::put('institution-types/{id}', 'InstitutionTypeController@update')->name('update');
    //Route::post('institution-types', 'InstitutionTypeController@store')->name('store');
    Route::get('institution-types/option-items', 'InstitutionTypeController@optionList')->name('institution-types.option-items');

    Route::get('', 'InstitutionController@index')->name('index');
    //Route::post('', 'InstitutionController@create')->name('create');
    Route::get('option-items', 'InstitutionController@optionList')->name('option-items');    
    //Route::get('{id}/departments', 'InstitutionController@departments')->where('id', '[0-9]+')->name('departments');
    //Route::put('{id}', 'InstitutionController@update')->where('id', '[0-9]+')->name('update');
});
