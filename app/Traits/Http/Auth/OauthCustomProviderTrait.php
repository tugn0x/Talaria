<?php
/**
 * Created by INKODE soc. coop.
 * User: Giorgio Resci
 * Email: giorgio@inkode.it
 */

namespace App\Traits\Http\Auth;


use League\OAuth2\Server\AuthorizationServer;

trait OauthCustomProviderTrait
{

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
