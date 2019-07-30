<?php namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class ApiEventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'messages.stored' => [
            'App\Listeners\EmailForNewMessage',
        ],
        'auth.registered' => [
            'App\Listeners\EmailForUserRegistered',
        ],
        /*
         * activate next and comment previous if you want welcome mail always a user is created, also in background: (so you dont need to fire auth.registered)
         */
//        'eloquent.created: App\Models\User\User' => [
//            'Clu\Api\Listeners\EmailForUserRegistered',
//        ],
        'auth.login' => [
        ],
        'auth.logout' => [
        ],
        'auth.delete' => [
        ],
        'auth.refresh' => [
        ],
        'auth.me' => [
        ],
        'auth.update' => [
        ],
        'password.change' => [
        ],
        'password.reset' => [
        ],
    ];

    /**
     * Register any other events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
