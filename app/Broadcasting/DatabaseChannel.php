<?php

namespace App\Broadcasting;

use App\Models\Users\User;
use Illuminate\Notifications\Channels\DatabaseChannel as BaseDatabaseChannel;

class DatabaseChannel extends BaseDatabaseChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\Users\User  $user
     * @return array|bool
     */
    public function join(User $user)
    {
        //
    }
}
