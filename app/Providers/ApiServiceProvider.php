<?php namespace App\Providers;

use Dingo\Api\Exception\Handler as ExceptionHandler;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Http\Kernel;
use Dingo\Api\Http\Request;
use App\Http\Controllers\Dispatcher;
use Illuminate\Support\Facades\Validator;

/**
 * A Laravel 5's package for Api.
 *
 * @author: Marco Nuccetelli
 */
class ApiServiceProvider extends ServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;
    /**
     * This will be used to register config & view in
     * your package namespace.
     *
     * --> Replace with your package name <--
     */
//    protected $packageName = 'apinilde';

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(Request $request, Kernel $kernel)
    {
//        $this->bootMailPlugin();
//        $this->extendValidator();
    }

    public function extendValidator()
    {
        Validator::extend('recaptcha-v3', 'App\Rules\RecapthaV3@passes');
        Validator::extend('match-old-password', 'App\Rules\MatchOldPassword@passes');
//        Validator::extend('foo', function ($attribute, $value, $parameters, $validator) {
//            return $value == 'foo';
//        });

    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->setupClassAliases();

        $this->registerDispatcher();
//        $this->registerException();
        $this->registerExceptionHandler();
    }

    /**
     * Setup the class aliases.
     *
     * @return void
     */
    protected function setupClassAliases()
    {
        $aliases = [
            'nilde' => Dispatcher::class,
            'nilde.dispatcher' => Dispatcher::class
        ];

        foreach ($aliases as $key => $aliases) {
            foreach ((array) $aliases as $alias) {
                $this->app->alias($key, $alias);
            }
        }
    }

    /**
     * Register the internal dispatcher.
     *
     * @return void
     */
    public function registerDispatcher()
    {
        $this->app->singleton('nilde.dispatcher', function ($app) {
            $dispatcher = new Dispatcher($app['\Dingo\Api\Dispatcher']);
            return $dispatcher;
        });
    }

    protected function registerExceptionHandler()
    {
        $this->app->singleton('api.exception', function ($app) {
            return new ExceptionHandler($app['Illuminate\Contracts\Debug\ExceptionHandler'], config('api.errorFormat'), config('api.debug'));
        });
    }
//    private function registerException()
//    {
//        $response = $this->app['api.http.response'];
//
//        $this->app['Dingo\Api\Exception\Handler']->register(function (\App\Exceptions\BulkApiException $exception) use ($response)
//        {
//            $exception_response = ['errors' => $exception->getErrors()];
//            $collection = $exception->getData();
//            if(count($collection))
//            {
//                $transformer = get_class($collection->first()->getModel())."Transformer";
//                $exception_response['data'] = json_decode($response->collection($collection, new $transformer)->getContent());
//            }
//
//            return $response->array($exception_response);
//
//        });
//
//        $this->app['Dingo\Api\Exception\Handler']->register(function (\Illuminate\Auth\Access\AuthorizationException $exception) use ($response)
//        {
//            return $response->errorUnauthorized($exception->getMessage() ?: trans('apinilde::auth.unauthorized'));
//        });
//    }

}
