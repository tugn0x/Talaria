<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Bouncer;
use Carbon\Carbon;

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
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /*
         * Permissions
         */
        $bouncer = Bouncer::ownedVia(\App\Models\Info::class, 'created_by');
        /*
         * Time locale
         */
        Carbon::setLocale('it');
    }
}
