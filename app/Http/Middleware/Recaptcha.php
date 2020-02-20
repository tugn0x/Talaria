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
//        return $next($request);
//        dd('PARTITO DEMOCRATICO!');

        $validator = \Validator::make($request->only('recaptcha'), [
            'recaptcha' => ['required', new RecaptchaV3()],
//            'body' => 'required',
        ]);
        if ($validator->fails()) {
            $validator->validate();
//            throw new \Dingo\Api\Exception\ValidationHttpException($validator->errors());
        }
//        $request->validate([
//            'recaptcha' => ['required', new RecaptchaV3()],
//]       );

        return $next($request);
    }
}
