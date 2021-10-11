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
    'as' => 'api.v1.libraries.borrowings.',
], function () {
    Route::get('{library}/borrowings', 'BorrowingDocdelRequestController@index')->name('index');
    //aggiorno in massa i borrowing selezionati (devo passargli un json con id dei borrowing, i campi da aggiornare
    //ed eventualmente array tagIds da applicare)
    Route::put('{library}/borrowings/updateSelected', 'BorrowingDocdelRequestController@updateSelected')->name('updateSelected');
    Route::get('{library}/borrowings/{id}', 'BorrowingDocdelRequestController@show')->name('show');
    Route::put('{library}/borrowings/{id}', 'BorrowingDocdelRequestController@update')->name('update');
    
    Route::post('{library}/borrowings', 'BorrowingDocdelRequestController@store')->name('create');
    Route::put('{library}/borrowings/{id}/changestatus', 'BorrowingDocdelRequestController@changeStatus')->name('changeStatus');
    Route::delete('{library}/requests/{ddrequest}/tags/{tag}', 'DocdelRequestTagController@delete')->name('delete'); //hard delete       
});

