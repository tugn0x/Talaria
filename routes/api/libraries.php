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
        Route::get('subjects/option-items', 'SubjectController@optionList')->name('subjects.option-items');
        //Route::get('subjects', 'SubjectController@index')->name('index');
    });

   /*
     * FILE UPLOAD
     */
    Route::group([
        'as' => 'api.v1.libraries.',
    ], function () {
        Route::post('{library}/UploadFile', 'FileUploadDocdelRequestController@UploadFile')->name('UploadFile');
        
    });

 
    /*
     * CATALOGS
     */
    Route::group([
        'as' => 'api.v1.libraries.catalogs.',
    ], function () {
        Route::get('catalogs/option-items', 'CatalogController@optionList')->name('catalogs.option-items');
        //Route::get('catalogs', 'CatalogController@index')->name('index');
       
    });

    /*
     * LIBRARY USERS
     */
    Route::group([
        'as' => 'api.v1.libraries.library-users.',
    ], function () {
        Route::get('my', 'LibraryUserController@my')->name('my'); //le biblio dell'utente
        Route::get('myactive', 'LibraryUserController@myactive')->name('myactivelist'); //le biblio ATTIVE dell'utente da usare in una tendina
        Route::post('{library}/library-users', 'LibraryUserController@store')->name('store');

        Route::get('{library}/library-users', 'LibraryUserController@index')->name('index');
        Route::put('{library}/library-users/{library_user}', 'LibraryUserController@update')->name('update');
        Route::get('{library}/library-users/{library_user}', 'LibraryUserController@show')->name('show');
        Route::delete('{library}/library-users/{library_user}', 'LibraryUserController@delete')->name('delete'); //hard delete
    });

    /* LIBRARY CATALOGS */
    Route::group([
        'as' => 'api.v1.libraries.library-catalogs.',
    ], function () {
        Route::post('{library}/catalogs', 'CatalogLibraryController@store')->name('store');

        Route::get('{library}/catalogs', 'CatalogLibraryController@index')->name('index');
        Route::put('{library}/catalogs/{library_catalog}', 'CatalogLibraryController@update')->name('update');
        Route::get('{library}/catalogs/{library_catalog}', 'CatalogLibraryController@show')->name('show');
        Route::delete('{library}/catalogs/{library_catalog}', 'CatalogLibraryController@delete')->name('delete'); //hard delete
    });

    /* LIBRARY TAGS*/
    Route::group([
        'as' => 'api.v1.libraries.library-tags.',
    ], function () {
        Route::get('{library}/tags', 'TagController@index')->name('index');
        Route::get('{library}/tags/option-items', 'TagController@optionList')->name('option-items');
        Route::get('{library}/tags/{tag_id}', 'TagController@show')->name('show');
        Route::put('{library}/tags/{tag_id}', 'TagController@update')->name('update');
        Route::delete('{library}/tags/{tag_id}', 'TagController@delete')->name('delete');
        Route::post('{library}/tags', 'TagController@store')->name('create');
    });

    /* LIBRARY DELIVERY*/
    Route::group([
        'as' => 'api.v1.libraries.library-deliveries.',
    ], function () {
        Route::get('{library}/deliveries', 'DeliveryController@index')->name('index');
        
        /* Tutti i Delivery dell'operatore (se abilitato al delivery) della biblio*/
         Route::get('{library}/deliveries/my', 'DeliveryController@my')->name('my');
        
        
        //posso usare questa anche per sapere conoscere gli operatori del PdC (?include=users)
        Route::get('{library}/deliveries/{delivery_id}', 'DeliveryController@show')->name('show');
        
        Route::put('{library}/deliveries/{delivery_id}', 'DeliveryController@update')->name('update');
        Route::post('{library}/deliveries', 'DeliveryController@store')->name('create');
        Route::delete('{library}/deliveries/{delivery_id}', 'DeliveryController@delete')->name('delete'); //hard delete
        
        
    });

    

    Route::post('public', 'LibraryController@publicCreate')->name('public-create');
    Route::get('', 'LibraryController@index')->name('index');
    Route::get('nearto', 'LibraryController@nearTo')->name('nearto');
    Route::get('option-items', 'LibraryController@optionList')->name('option-items');
    Route::get('{id}', 'LibraryController@show')->where('id', '[0-9]+')->name('show');
    Route::get('{id}/departments', 'LibraryController@departments')->where('id', '[0-9]+')->name('departments');
    Route::put('{id}', 'LibraryController@update')->where('id', '[0-9]+')->name('update');
    Route::post('', 'LibraryController@create')->name('create');
    Route::delete('{id}', 'LibraryController@delete')->where('id', '[0-9]+')->name('delete'); //soft delete



});

