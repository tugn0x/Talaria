<?php namespace App\Http\Middleware;

use App\Rules\RecaptchaV3;
use Closure;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Http\Request;

class Recaptcha
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
        if($request->getClientIp() !== '127.0.0.1') {
            $validator = \Validator::make($request->only('recaptcha'), [
                'recaptcha' => ['required', new RecaptchaV3()],
            ]);
            if ($validator->fails()) {
                throw new \Dingo\Api\Exception\ValidationHttpException($validator->errors());
            }
        }
        return $next($request);
    }
}
