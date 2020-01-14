<?php
/**
 * Created by INKODE soc. coop.
 * User: Giorgio Resci
 * Email: giorgio@inkode.it
 */

Route::group([
    'namespace' => 'Auth',
    'prefix' => 'auth',
//    'middleware' => ['api','auth:api',],
    'middleware' => 'api',
    'as' => 'api.v1.auth.',
], function () {
    Route::get('register', 'AuthController@postRegister')->name('register');
    Route::get('forgot-password', 'PasswordController@forgotPassword')->name('forgot-password');
    Route::get('reset-password', 'PasswordController@resetPassword')->name('reset-password');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', 'AuthController@logout')->name('logout');
    });

    Route::post('social/{provider}/signup', 'SocialAuthController@signupFromSocialProvider');
    Route::post('idp/{provider}/signup', 'SocialAuthController@signupFromIdentityProvider');
});
