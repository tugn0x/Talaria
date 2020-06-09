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

    /* LABELS */
    Route::group([
        'as' => 'api.v1.references.labels.',
    ], function () {
        Route::get('labels', 'LabelController@index')->name('index');
        Route::get('labels/option-items', 'LabelController@optionList')->name('option-items');
        Route::get('labels/{id}', 'LabelController@show')->name('show');
        Route::put('labels/{id}', 'LabelController@update')->name('update');
        Route::post('labels', 'LabelController@store')->name('create');
    });

    /* GROUPS */
    Route::group([
        'as' => 'api.v1.references.groups.',
    ], function () {
        Route::get('groups', 'GroupController@index')->name('index');
        Route::get('groups/option-items', 'GroupController@optionList')->name('option-items');
        Route::get('groups/{id}', 'GroupController@show')->name('show');
        Route::put('groups/{id}', 'GroupController@update')->name('update');
        Route::post('groups', 'GroupController@store')->name('create');
    });
    
    

    Route::get('my', 'ReferenceController@my')->name('my');
    Route::get('', 'ReferenceController@index')->name('index');
    Route::get('option-items', 'ReferenceController@optionList')->name('option-items');
    Route::get('{id}', 'ReferenceController@show')->name('show');
    Route::put('{id}', 'ReferenceController@update')->name('update');
    Route::post('', 'ReferenceController@store')->name('create');
});

