<?php namespace App\Traits\Http\Auth;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
//use Dingo\Api\Http\Request;
use App\Models\Users\UserTransformer;
use App\Models\Users\User;
//use Event;
use Gate;
use League\OAuth2\Server\AuthorizationServer;
//use Authorizer;

trait AuthControllerTrait
{

	/**
	 * Handle a registration request for the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function postRegister(Request $request)
	{
		$this->validate($request, [
		    'email' => 'required|email',
		    'password' => 'required',
		    'password_confirmation' => 'required',
		    'name' => 'required',
		    'surname' => 'required',
		    'username' => 'required',
//			'g-recaptcha-response' => 'required|recaptcha'
		]);

		$controller = \App::make('App\Http\Controllers\Users\UserController');
		$controller->nilde->disableAuthorize();
		$response = $controller->store($request);
		$controller->nilde->enableAuthorize();
		event('auth.registered', $response->getOriginalContent());

		/*
		 * return an access_token
		 */
        $proxy = \Request::create(
            'oauth/token',
            'POST'
        );
        return \Route::dispatch($proxy);
	}

    /*
     * Logout User / Revoke token with Laravel Passport
     */
	public function logout(Request $request)
	{
        $user = Auth::user();
        event('auth.logout', $user);
	    if($user && $user->token())
        {
            $user->token()->revoke();
            event('auth.logout', $user);
            Auth::logout();
        }
        return $this->response->array([]);
	}

	/**
	 * Handle a permission request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function permissions(Request $request)
	{
		if (Auth::check()) {
			$user = Auth::user();
//			dd(get_class($user->abilities->groupBy('entity_type')));
            $token_perms = [
                "resources" => $user->abilities()
                    ->select('abilities.entity_id','abilities.entity_type','abilities.name')
                    ->get()
                    ->groupBy('entity_type'),
                "roles" => $user->roles->pluck('name'),
                "permissions" => $user->abilities
            ];
//			$token_perms = base64_encode((string)json_encode($token_perms));
			return $this->response->array($token_perms);
		}
		return $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
	}

//	private function permissionResources(User $user) {
//        $reso
//    }

	/**
	 * Show user info retrived by token.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function me(Request $request)
	{
		$user = Auth::user();
		event('auth.me', $request);
		return $this->response->item($user, new UserTransformer());
	}

	/**
	 * Show user info retrived by token.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function updateMe(Request $request)
	{
		$user = Auth::user();
		$controller = \App::make('App\Http\Controllers\Users\UserController');
		$controller->nilde->disableAuthorize();
		$update = $controller->update($request, $user->id);
		$controller->nilde->enableAuthorize();
		event('auth.update', $update->getOriginalContent());
		return $update;
	}

	/**
	 * Log the user out of the application.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function getLogout()
	{
	    return $this->logout();
	}

	/*
	 * Destroy Logged in User
	 */
	public function deleteMe(Request $request)
	{
		$user = Auth::user();
        $controller = \App::make('App\Http\Controllers\UserController');
        $controller->nilde->disableAuthorize();
        $delete = $controller->delete($request, $user->id);
        $controller->nilde->enableAuthorize();
		event('auth.delete', $delete->getOriginalContent());
		return $delete;
	}


    /**
     * Permit to SuperAdmin to issue a Password Grant for a user.
     * needs client_id & client_secret
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
	public function loginAs( Request $request, AuthorizationServer $authorizationServer, $id)
    {

        $user = Auth::user();
        if(\Gate::allows('loginAs', $user->getModel()))
        {
            $request = (new \Zend\Diactoros\ServerRequest)->withParsedBody([
                'grant_type' => 'nilde-password',
                'client_id' => $request->input("client_id"),
                'client_secret' => $request->input("client_secret"),
                'user_id' => $id,
                'scope' => '*',
            ]);

            $grant = new \App\Traits\Http\Auth\NildePasswordGrant(
                app(\Laravel\Passport\Bridge\UserRepository::class),
                app(\Laravel\Passport\Bridge\RefreshTokenRepository::class)
            );

            $grant->setRefreshTokenTTL(\Laravel\Passport\Passport::refreshTokensExpireIn());

            $authorizationServer->enableGrantType($grant, \Laravel\Passport\Passport::tokensExpireIn());
//
            $response = json_decode($authorizationServer->respondToAccessTokenRequest(
                $request, new \Zend\Diactoros\Response
            )->getBody()->__toString(), true);

            return $response;
        }

    }

}
