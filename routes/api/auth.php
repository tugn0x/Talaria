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
//    'middleware' => 'api',
    'as' => 'api.v1.auth.',
], function () {
    Route::group([
        'middleware' => 'recaptcha',
    ], function () {
        Route::post('register', 'AuthController@postRegister')->name('register');
        Route::post('forgot-password', 'PasswordController@forgotPassword')->name('forgot-password');
        Route::post('reset-password', 'PasswordController@resetPassword')->name('reset-password');
    });

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('change-password', 'PasswordController@changePassword')->name('change-password');
        Route::post('logout', 'AuthController@logout')->name('logout');
    });

    Route::post('social/{provider}/signup', 'SocialAuthController@signupFromSocialProvider');
    Route::post('idp/{provider}/signup', 'SocialAuthController@signupFromIdentityProvider');
});
