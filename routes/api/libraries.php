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
    'namespace' => 'Libraries',
    'prefix' => 'libraries',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.libraries.',
], function () {

    /*
     * SUBJECTS
     */
    Route::group([
        'as' => 'api.v1.libraries.subjects.',
    ], function () {
        Route::get('subjects', 'SubjectController@index')->name('index');
        Route::get('subjects/option-items', 'SubjectController@optionList')->name('subjects.option-items');
    });

    /*
     * LIBRARY USERS
     */
    Route::group([
        'as' => 'api.v1.libraries.library-users.',
    ], function () {
        Route::get('my', 'LibraryUserController@my')->name('my');
        Route::post('{library}/library-users', 'LibraryUserController@store')->name('store');

        Route::get('{library}/library-users', 'LibraryUserController@index')->name('index');
        Route::put('{library}/library-users/{library_user}', 'LibraryUserController@update')->name('update');
        Route::get('{library}/library-users/{library_user}', 'LibraryUserController@show')->name('show');
        Route::delete('{library}/library-users/{library_user}', 'LibraryUserController@customdelete')->name('customdelete'); //hard delete
    });


    Route::post('public', 'LibraryController@publicCreate')->name('public-create');
    Route::get('', 'LibraryController@index')->name('index');
    Route::get('option-items', 'LibraryController@optionList')->name('option-items');
    Route::get('{id}', 'LibraryController@show')->name('show');
    Route::get('{id}/departments', 'LibraryController@departments')->name('departments');
    Route::put('{id}', 'LibraryController@update')->name('update');
    Route::post('', 'LibraryController@create')->name('create');
    Route::delete('{id}', 'LibraryController@delete')->name('delete'); //soft delete



});

