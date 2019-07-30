<?php

namespace App\Models\Libraries;


use App\Models\BaseModel;

class Library extends BaseModel
{
    protected static $observerClass = LibraryObserver::class;

    /*
     * Fillable attributes
     */
    protected $fillable = [
        'name',
        'email',
    ];

    /*
     * Accessor & relation to automatically append on model instance
     */
    protected $appends = [

    ];

    /*
     * Default attributes
     */
    protected $attributes = [
      'name' => ''
    ];

    protected $casts = [
      'name' => 'json'
    ];
}
