<?php

namespace App\Providers;

use App\Broadcasting\DatabaseChannel;
use Illuminate\Support\ServiceProvider;
use Bouncer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\Relation;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local', 'testing')) {
            /*
             * Laravel Dusk
             */
//            $this->app->register(DuskServiceProvider::class);

            /*
             * Faker
             */
            $this->app->singleton(\Faker\Generator::class, function () {
                return \Faker\Factory::create('it_IT');
            });
        }

        Relation::morphmap(config('nilde.morphmap'));

        $this->app->bind(
            Illuminate\Notifications\Channels\DatabaseChannel::class,
            DatabaseChannel::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //FIX Horizon via https:
        //\Illuminate\Support\Facades\URL::forceScheme('https');

        /*
         * Permissions
         */
        Bouncer::ownedVia(\App\Models\Info::class, 'created_by');
//        Bouncer::runAfterPolicies(false);
        /*
         * Time locale
         */
        Carbon::setLocale('it');

        /*
         * Adding relation morphmap aliases
         */
        Relation::morphMap(config('nilde.morphmap'));

    }
}
