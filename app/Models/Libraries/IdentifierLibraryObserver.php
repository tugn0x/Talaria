<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class IdentifierLibraryObserver extends BaseObserver
{

    protected $rules = [
        'library_id' => 'required|integer|exists:libraries,id',
        'identifier_id' => 'required|integer|exists:identifiers,id',
    ];


    protected function setConditionalRules($model)
    {
    }

    public function creating($model)
    {
         return parent::creating($model);
    }

    public function created($model)
    {
        return parent::created($model);   
    }

    public function saving($model)
    {
        return parent::saving($model);
    }

    public function saved($model)
    {
        return parent::saved($model);

    }

    public function deleting($model)
    {
        return parent::deleting($model);
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }

}
