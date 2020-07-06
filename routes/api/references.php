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

    /*
     * REFERENCE LABELS
     */
    Route::group([
        'as' => 'api.v1.references.reference-labels.',
    ], function () {
        Route::post('{reference}/labels', 'LabelReferenceController@store')->name('store');
        Route::get('{reference}/labels', 'LabelReferenceController@index')->name('index');
       // Route::put('{reference}/labels/{label}', 'LabelReferenceController@update')->name('update');
       // Route::get('{reference}/labels/{label}', 'LabelReferenceController@show')->name('show');
        Route::delete('{reference}/labels/{label}', 'LabelReferenceController@delete')->name('delete'); //hard delete
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

    /*
     * REFERENCE GROUPS
     */
    Route::group([
        'as' => 'api.v1.references.reference-groups.',
    ], function () {
        Route::post('{reference}/groups', 'GroupReferenceController@store')->name('store');
        Route::get('{reference}/groups', 'GroupReferenceController@index')->name('index');
      //  Route::put('{reference}/groups/{group}', 'GroupReferenceController@update')->name('update');
      //  Route::get('{reference}/groups/{group}', 'GroupReferenceController@show')->name('show');
        Route::delete('{reference}/groups/{group}', 'GroupReferenceController@delete')->name('delete'); //hard delete
    });

    
    

    //NOTA: ho previsto un filtro per labelId e groupId
    //my?labelIds=1,4&groupIds=5,7,8&q=nature
    Route::get('my', 'ReferenceController@my')->name('my');
    
    //aggiorno in massa i riferimenti selezionati (devo passargli un json con id dei riferimenti, i campi da aggiornare
    //ed eventualmente array label/group da applicare)
    Route::put('updateSelected', 'ReferenceController@updateSelected')->name('updateSelected');

    //Le richieste (PatronDDRequest)associate a un riferimento
    Route::get('{id}/patronrequests', '\App\Http\Controllers\Requests\PatronDocdelRequestController@index')->name('patronrequests');
    
    Route::get('{id}', 'ReferenceController@show')->name('show');
    Route::put('{id}', 'ReferenceController@update')->name('update');
    Route::post('', 'ReferenceController@store')->name('create');
    Route::delete('{id}', 'ReferenceController@delete')->name('delete');
    
});

