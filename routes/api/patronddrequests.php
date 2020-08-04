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
    'namespace' => 'Requests',
    'prefix' => 'patronrequests',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.patronrequests.',
], function () {
    //NOTA: ho previsto un filtro per labelId e groupId del riferimento della richiesta
    //my?labelIds=1,4&groupIds=5,7,8&archived=0|1
    Route::get('my', 'PatronDocdelRequestController@my')->name('my');
    //Route::get('', 'PatronDocdelRequestController@index')->name('index');
    //Route::get('option-items', 'ReferenceController@optionList')->name('option-items');
    Route::get('{id}', 'PatronDocdelRequestController@show')->name('show');
    Route::put('{id}', 'PatronDocdelRequestController@update')->name('update');
    Route::post('', 'PatronDocdelRequestController@store')->name('create');
    Route::put('{id}/changestatus', 'PatronDocdelRequestController@changeStatus')->name('changeStatus');
});