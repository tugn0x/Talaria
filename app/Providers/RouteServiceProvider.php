<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Dingo\Api\Routing\Router;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';
    protected $api;

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

            $this->mapDingoApiRoutes();

            $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }


//    protected function mapDingoApiRoutes()
//    {
//        $api = app('Dingo\Api\Routing\Router');
//        $api->version('v1', function ($api) {
//            $api->get('test', 'App\Http\Controllers\ApiController@test');
////            require_once base_path('routes/dingoapi.php');
//        });
//
//    }
    protected function mapDingoApiRoutes()
    {
        $api = app('Dingo\Api\Routing\Router');
        $api->version('v1', function ($api) {
            $api->get('test', 'App\Http\Controllers\TestController@test');
        });

    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        $this->scanDirectory('routes/api', [
            'middleware' => 'api',
            'namespace' => $this->namespace,
            'prefix' => 'api/v1',
//            'prefix' => '',
            'version' => 'v1',
        ]);
    }

    protected function scanDirectory(string $path, array $options)
    {
        if (mb_substr($path, -1) !== '/') {
            $path .= '/';
        }

        $files = array_diff(scandir(base_path($path)), ['.', '..']);
        $middleware = $options['middleware'];
        $namespace = $options['namespace'];
        $prefix = $options['prefix'];
        $version = $options['version'];
//        $api = app('Dingo\Api\Routing\Router');

        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
//                Route::middleware($middleware)->prefix($prefix)->version($version)->namespace($namespace)->group(base_path($path . $file));
                Route::middleware($middleware)->prefix($prefix)->namespace($namespace)->group(base_path($path . $file));
//                require_once base_path($path . $file);
            }
        }
    }
}
