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
    'prefix' => 'libraries',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.libraries.lendings.',
], function () {

    Route::get('{library}/lendings', 'LendingDocdelRequestController@index')->name('index');
    Route::put('{library}/lendings/updateSelected', 'LendingDocdelRequestController@updateSelected')->name('updateSelected');
    Route::get('{library}/lendings/{id}', 'LendingDocdelRequestController@show')->name('show');
    Route::put('{library}/lendings/{id}', 'LendingDocdelRequestController@update')->name('update');
    Route::post('{library}/lendings', 'LendingDocdelRequestController@store')->name('create');
    Route::put('{library}/lendings/{id}/changestatus', 'LendingDocdelRequestController@changeStatus')->name('changeStatus');
    Route::put('{library}/lendings/{id}/acceptallLenderLending', 'LendingDocdelRequestController@acceptallLenderLending')->name('acceptallLenderLending');
    Route::delete('{library}/requests/{ddrequest}/tags/{tag}', 'DocdelRequestTagController@delete')->name('delete'); //hard delete       
});

