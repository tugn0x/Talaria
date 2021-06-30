<?php namespace App\Traits\Model;

trait StatusResolverTrait
{    

    public function getStatusField() {
        return $this->statusField??'status';
    }

    public function getStatus() {
        return $this->attributes[$this->statusField];
    }    
}
