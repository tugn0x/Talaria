<?php
namespace App\Http\Controllers;

use \Dingo\Api\Routing\Helpers as DingoHelpers;

trait Helpers
{
    use DingoHelpers;

    /**
     * Get the internal dispatcher instance.
     *
     * @return \Clu\Api\Dispatcher
     */
    public function nilde()
    {
        return app('nilde.dispatcher');
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
            'api', 'user', 'auth', 'response', 'nilde'
        ];
        if (in_array($key, $callable) && method_exists($this, $key)) {
            return $this->$key();
        }
        throw new \ErrorException('Undefined property '.get_class($this).'::'.$key);
    }
}
