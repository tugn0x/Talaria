<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Models\Users\OauthSocialProvider;
use Illuminate\Http\Request;
use Socialite;
use App\Models\Users\User;
use Carbon\Carbon;
use Hash;
use League\OAuth2\Server\AuthorizationServer;

class SocialAuthController extends ApiController
{
    /**
     * Redirect the user to the Facebook authentication page.
     *
     * @return Response
     */
    public function redirectToProvider(Request $request, string $provider)
    {
        $socialite = Socialite::driver($provider);
        if($provider === 'facebook')
            $socialite->with(['state' => $request->state]);

        return $socialite->scopes(config("services.$provider.user_scopes"))
            ->stateless()
            ->redirect();
    }

    private function getUserIfAuthenticated(Request $request)
    {
        if (\Auth::guard('api')->check()) {
            return $request->user('api');
        }
    }
    private function getUserByProviderID($provider, $provider_id)
    {
        $socialAccount = OauthSocialProvider::where([
            ['provider_name', $provider],
            ['provider_id', $provider_id],
        ])->first();
        if($socialAccount) {
            return $socialAccount->user;
        }
    }

    /**
     * Obtain the user information from Facebook.
     *
     * @return JsonResponse
     */
    public function handleProviderCallback(Request $request, AuthorizationServer $authorizationServer, string $provider)
    {
        // check if there is an already authenticated user
        $user = $this->getUserIfAuthenticated($request);

        // this user we get back is not our user model, but a special user object that has all the information we need
        $providerUser = Socialite::driver($provider)->stateless()->user();

        if(!$user) {
            $user = $this->getUserByProviderID($provider, $providerUser->id);
        }

        if(!$user) {
            $userData = $this->$provider($providerUser);
            $user = User::firstOrNew(['email' => $userData['email']]);
            if(!$user->exists) {
                $user->forceFill($userData);
                $user->password = Hash::make($userData['password']);
                $user->save();
            }
        }

        // make provider stuffs to user
        if($user) {
            $user->oauth_social_providers()->firstOrCreate([
                'provider_name' => $provider,
                'provider_id' => $providerUser->id,
                'user_id' => $user->id,
            ]);
            OauthSocialProvider::where([
                ['provider_name', $provider],
                ['provider_id', $providerUser->id],
                ['user_id', '<>', $user->id],
            ])->delete();
        }
        /*
         * return an access_token
         */
        $oauth = $this->getOauthToken($authorizationServer, $user->id);
        return $oauth;
    }

    public function signupFromSocialProvider(Request $request, AuthorizationServer $authorizationServer, string $provider)
    {
        $user = $this->getUserIfAuthenticated($request);

        $providerUser = Socialite::driver($provider)->userFromToken($request->accessToken);

        if(!$user) {
            $userData = $this->$provider($providerUser);
            $user = User::firstOrNew(['email' => $userData['email']]);
            if(!$user->exists) {
                $user->forceFill($userData);
                $user->password = Hash::make($userData['password']);
                $user->save();
            }
        }

        // make provider stuffs to user
        if($user) {
            $user->oauth_social_providers()->firstOrCreate([
                'provider_name' => $provider,
                'provider_id' => $providerUser->id,
                'user_id' => $user->id,
            ]);
            OauthSocialProvider::where([
                ['provider_name', $provider],
                ['provider_id', $providerUser->id],
                ['user_id', '<>', $user->id],
            ])->delete();
        }
        /*
         * return an access_token
         */
        $oauth = $this->getOauthToken($authorizationServer, $user->id);
        return $oauth;
    }

    /*
     * Create or authorize user from an Identity provider.
     *
        {
          "email" => "user@example.com",
          "name" => "Alex",
          "surname" => "Nilde",
          "provider_id" => "TENVqm9eXhOYje"
        }
     *
     * @return Response
     */
    public function signupFromIdentityProvider(Request $request, AuthorizationServer $authorizationServer, string $provider)
    {
        $user = $this->getUserIfAuthenticated($request);
        $providerUser = $request->except("provider_id");

        if(!$user) {
            $user = $this->getUserByProviderID($provider, $request->provider_id);
        }

        if(!$user) {
            $userData = $providerUser;
            $user = User::firstOrNew(['email' => $userData['email']]);
            if(!$user->exists) {
                $user->forceFill($userData);
                $user->password = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(16/strlen($x)) )),1,16);
                $user->save();
            }
        }

        // make provider stuffs to user
        if($user) {
            $user->oauth_social_providers()->firstOrCreate([
                'provider_name' => $provider,
                'provider_id' => $request->provider_id,
                'user_id' => $user->id,
            ]);
            OauthSocialProvider::where([
                ['provider_name', $provider],
                ['provider_id', $request->provider_id],
                ['user_id', '<>', $user->id],
            ])->delete();
        }
        /*
         * return an access_token
         */
        $oauth = $this->getOauthToken($authorizationServer, $user->id);
        return $oauth;
    }

    public function facebook($providerUser) {
        $name = explode(' ', $providerUser->name);
        return [
            'email' => $providerUser->email,
            'name' => array_shift($name),
            'surname' => array_pop($name),
            'email_verified_at' => Carbon::now(),
//            'status' => 1,
            'password' => substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(16/strlen($x)) )),1,16),
        ];
    }

    public function google($providerUser) {
        return [
            'email' => $providerUser->email,
            'name' => $providerUser->user['given_name'],
            'surname' => $providerUser->user['family_name'],
            'email_verified_at' => Carbon::now(),
//            'status' => 1,
            'password' => substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(16/strlen($x)) )),1,16),
        ];
    }

    private function getOauthToken(AuthorizationServer $authorizationServer, $id)
    {
        $request = (new \Zend\Diactoros\ServerRequest)->withParsedBody([
            'grant_type' => 'nilde-password',
            'client_id' => config('api.api_client.name'),
            'client_secret' => config('api.api_client.secret'),
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
