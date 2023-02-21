<?php
/**
 * Created by INKODE soc. coop.
 * User: Giorgio Resci
 * Email: giorgio@inkode.it
 */

Route::group([
    'namespace' => 'Commons',
    'prefix' => 'commons',
//    'middleware' => ['api','auth:api',],
//    'middleware' => 'api',
    'as' => 'api.v1.commons.',
], function () {
    Route::get('countries/option-items', 'CountryController@optionList')->name('countries.option-items');
    Route::get('titles/option-items', 'TitleController@optionList')->name('titles.option-items');        
});
