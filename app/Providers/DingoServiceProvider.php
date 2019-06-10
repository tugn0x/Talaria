<?php

namespace App\Providers;

use RuntimeException;
use Dingo\Api\Auth\Auth;
use Dingo\Api\Dispatcher;
use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response;
use Dingo\Api\Console\Command;
use Dingo\Api\Exception\Handler as ExceptionHandler;
use Dingo\Api\Transformer\Factory as TransformerFactory;
use Dingo\Api\Provider\ServiceProvider;
use Dingo\Api\Provider\RoutingServiceProvider;
use Dingo\Api\Provider\HttpServiceProvider;

class DingoServiceProvider extends \Dingo\Api\Provider\DingoServiceProvider
{

}
