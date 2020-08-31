<?php 
use Illuminate\Http\Request;



Route::group([
   /* 'namespace' => 'iso18626',*/
    'prefix' => 'iso18626',
    'as' => 'iso18626.',
], function () {
    Route::post('/', '\App\Http\Controllers\ISO18626Controller@parse')->name("parse");

});
