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
    'middleware' => ['api','auth:api'],
    'prefix' => 'auth',
    ], function () {
    Route::get('me', ['as' => 'auth.me.show', 'uses' => 'Auth\AuthController@me']);
    Route::put('me', ['as' => 'auth.me.update', 'uses' => 'Auth\AuthController@updateMe']);
//    Route::put('change-password', ['as' => 'auth.password.change-password', 'uses' => 'Auth\PasswordController@changePassword']);
    Route::get('permissions', ['as' => 'auth.permissions', 'uses' => 'Auth\AuthController@permissions']);
    Route::get('resources', ['as' => 'auth.resources', 'uses' => 'Auth\AuthController@resources']);

});

Route::group([
    'namespace' => 'Users',
    'prefix' => 'users',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.users.',
], function () {
    Route::get('option-items', 'UserController@optionList')->name('option-items');
    Route::get('users', 'UserController@index')->name('index');
    Route::get('users/{user}', 'UserController@show')->name('show');
    Route::put('users/{user}', 'UserController@update')->name('update');
    Route::post('users', 'UserController@store')->name('create');
    Route::get('roles', 'RolePermissionController@index')->name('roles-index');
});

Route::group([
    'namespace' => 'Users',
    'prefix' => 'notifications',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.notifications.',
], function () {
    Route::get('', 'NotificationController@index')->name('index');
    Route::put('mark_all_as_read', 'NotificationController@markAllAsRead')->name('mark_all_as_read');
    Route::get('{id}', 'NotificationController@show')->name('show');
});
