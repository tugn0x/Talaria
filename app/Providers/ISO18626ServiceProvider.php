<?php

namespace App\Providers;

use App\Modules\ISO18626\IsoMessage;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;

class ISO18626ServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
       
        Request::macro('isXml', function () {
            return $this->getContentType() == 'xml';
        });

        Request::macro('iso18626', function () {
            if (! $this->isXml() || ! $content = $this->getContent()) {
                return false; //retun exception...
            }
            
            return new IsoMessage($content);
        });


       
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
