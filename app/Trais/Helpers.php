<?php
namespace App\Traits;

use \Dingo\Api\Routing\Helpers as DingoHelpers;

trait Helpers
{
    use DingoHelpers;

    /**
     * Get the internal dispatcher instance.
     *
     * @return \App\Traits\Dispatcher
     */
    public function api()
    {
        return app('api.dispatcher');
    }

    /**
     * Magically handle calls to certain properties.
     *
     * @param string $key
     *
     * @throws \ErrorException
     *
     * @return mixed
     */
    public function __get($key)
    {
        $callable = [
            'api',
//            'user',
//            'auth',
//            'response',
        ];
        if (in_array($key, $callable) && method_exists($this, $key)) {
            return $this->$key();
        }
        throw new \ErrorException('Undefined property '.get_class($this).'::'.$key);
    }
}
