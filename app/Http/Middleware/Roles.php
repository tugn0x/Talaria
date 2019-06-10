<?php

namespace App\Http\Middleware;

use Closure;
use Bouncer;

class Roles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param string $guard
     * @return mixed
     */
    public function handle($request, Closure $next, ... $roles)
    {
        $user = $request->user();
        foreach($roles as $role) {
            if($user->isAn($role)) {
                return $next($request);
            }
        }
        throw new \Dingo\Api\Exception\ValidationHttpException(['Permission denied.']);
    }
}
