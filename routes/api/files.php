<?php

use Illuminate\Http\Request;


Route::group([
    'namespace' => 'Files',
    'prefix' => 'files',
    'middleware' => ['api','auth:api',],
    'as' => 'api.v1.files.',
], function () {

      /*
     * FILE UPLOAD/DOWNLOAD
     */
    Route::group([        
    ], function () {
        Route::post('/UploadFile', 'FileUploadDocdelRequestController@UploadFile')->name('UploadFile');
        Route::get('/DownloadFile', 'FileDownloadDocdelRequestController@DownloadFile')->name('DownloadFile');    
    });
});



