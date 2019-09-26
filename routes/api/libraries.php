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
//    'middleware' => 'api',
    'as' => 'api.v1.libraries.',
], function () {
//    Route::get('/', 'LibraryController@test')->name('test');
    Route::get('', 'LibraryController@index')->name('index');
    Route::put('{library}', 'LibraryController@update')->name('update');
    Route::post('', 'LibraryController@create')->name('create');
});
//$api = app('Dingo\Api\Routing\Router');
//$api->version('v1', function ($api) {
//    $api->get('libraries', 'App\Http\Controllers\Libraries\LibraryController@test');
//});
