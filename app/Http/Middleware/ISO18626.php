<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ISO18626
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //controllo che sia xml
        if($request->getContentType() != 'xml')
            abort(415,"Unsupported Media Type");
        
        //poi chiamo next
        return $next($request);
    }
}
