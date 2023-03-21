<?php

namespace App\Facade;

use Dingo\Api\Http\InternalRequest;
use Illuminate\Support\Facades\Facade;

class ApiTalaria extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return env('API_DOMAIN', null);
    }
}
