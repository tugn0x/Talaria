<?php

namespace App\Models\Libraries;


use App\Models\BaseModel;
use App\Models\Institutions\Institution;
use App\Models\Projects\Project;

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

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
