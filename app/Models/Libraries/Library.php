<?php

namespace App\Models\Libraries;


use App\Models\BaseModel;

class Library extends BaseModel
{
    protected static $observerClass = LibraryObserver::class;

    protected $fillable = [];
    protected $appends = [];
}
