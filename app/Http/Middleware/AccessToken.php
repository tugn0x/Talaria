<?php namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Http\Request;

class AccessToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        exit('passo');
        if(!$request->header('Authorization') && $request->has('access_token'))
        {
            $request->headers->set('Authorization', 'Bearer '.$request->input('access_token'));
            return $next($request);
        }

        return $next($request);
    }
}
