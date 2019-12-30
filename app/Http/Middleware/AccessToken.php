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
        if(!$request->header('Authorization') && $request->hasAny(['access_token', 'state']))
        {
            $request->headers->set('Authorization', 'Bearer '.$request->input('access_token', $request->input('state')));
        }

        return $next($request);
    }
}
