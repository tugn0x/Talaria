<?php namespace App\Traits\Model;
use Auth;

trait OwnerTrait
{
    protected $ownerField = 'created_by'; // ex user_id

    public function getOwnerField() {
        return $this->ownerField;
    }
    /*
     * Is Owner
     *
     * Check if the user_id attributes is equal to current user id
     */
    public function isOwner($user_id=null)
    {
        $user_id = $user_id ?: Auth::user()->id;
        $of = $this->getOwnerField();
        return (bool) ($this->$of == $user_id);
    }

    /*
     * Scopes
     */
    public function scopeOwned($query, $user_id=null)
    {
        return $query->where($this->getOwnerField(), $user_id ?: Auth::user()->id);
    }

    /*
     * Scopes
     */
    public function scopeIndexPolicyDenies($query)
    {
        if(\Schema::hasColumn($this->getTable(), $this->getOwnerField()))
            return $query->owned();
        /*
         * else return query with impossible condition
         */
        return $query->where('id', 0);
    }

    public function scopeUpdatePolicyDenies($query)
    {
        return $query->indexPolicyDenies();
    }

    public function scopeAttachPolicyDenies($query)
    {
        return $query->indexPolicyDenies();
    }
}
