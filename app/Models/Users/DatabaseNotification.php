<?php

namespace App\Models\Users;

use App\Models\Users\DatabaseNotificationObserver;
use App\Traits\Model\ModelTrait;
use Illuminate\Notifications\DatabaseNotification as BaseDatabaseNotification;

class DatabaseNotification extends BaseDatabaseNotification
{
    use ModelTrait;

    /**
     * Get the object entity of the notification.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function object()
    {
        return $this->morphTo();
    }
    
    
    public static function boot()
    {
        parent::boot();

        self::observe(new DatabaseNotificationObserver);
    }
    public static function bootSoftDeletes() {}
    public static function bootUserstamps() {}

    public function scopeOwned($query, $user_id=null)
    {
        return $query->whereIn('notifiable_type', [User::class, 'user'])->where('notifiable_id', $user_id ?: \Auth::user()->id);
    }

    public function scopeIndexPolicyDenies($query)
    {
        return $query->owned();
    }

    public function scopeUnreaded($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeReaded($query)
    {
        return $query->whereNotNull('read_at');
    }

    public function scopeUnSent($query)
    {
        return $query->Unreaded()->whereNull('email_at');
    }

    public function setToRead()
    {
        return $this->markAsRead();
    }

    public function markAsUnread()
    {
        if (!is_null($this->read_at)) {
            $this->forceFill(['read_at' => null])->save();
        }
    }

    public function markAsSent()
    {
        if (is_null($this->email_at)) {
            $this->forceFill(['email_at' => now()])->save();
        }
    }

    public function setToUnread()
    {
        return $this->markAsUnread();
    }

    public function getReadAttribute()
    {
        return is_null($this->read_at);
    }
}
