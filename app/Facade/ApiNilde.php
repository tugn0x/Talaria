<?php

namespace App\Facade;

use Dingo\Api\Http\InternalRequest;
use Illuminate\Support\Facades\Facade;

class ApiNilde extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'api.nilde';
    }
}
