<?php namespace App\Traits\Http\Auth;

use App\Rules\MatchOldPassword;
use Illuminate\Http\Request;
use Event;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;

use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Mail\Message;
use Mockery\Generator\StringManipulation\Pass\Pass;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

trait PasswordControllerTrait {
//    use SendsPasswordResetEmails, ResetsPasswords;
    use SendsPasswordResetEmails;

    /**
	 * Send a reset link to the given user.
	 *
	 * @param  Request  $request
	 * @return Response
	 */
	public function forgotPassword(Request $request)
	{
        $this->validate($request, ['email' => 'required|email']);

		$response = $this->broker()->sendResetLink($request->only('email'), function($m) use ($request)
		{
			$m->emaiTo = $request->input('email');
			$m->subject($this->getResetEmailSubject());
		});

        event('password.reset', $request);

        switch ($response)
        {
            case Password::RESET_LINK_SENT:
                return $this->response->array(['message' => trans($response)]);

            case Password::INVALID_USER:
                return $this->response->errorUnauthorized(trans($response));
        }
    }

	/**
	 * Get the e-mail subject line to be used for the reset link email.
	 *
	 * @return string
	 */
	protected function getResetEmailSubject()
	{
		return isset($this->subject) ? $this->subject : trans('apinilde::auth.password_reset_email_subject');
	}

	/**
	 * Reset the given user's password.
	 *
	 * @param  Request  $request
	 * @return Response
	 */
	public function resetPassword(Request $request)
	{
		$this->validate($request, [
			'token' => 'required',
			'email' => 'required|email',
			'password' => 'required|confirmed',
//			'password_confirmation' => 'required',
		]);

		$credentials = $request->only(
			'email', 'password', 'password_confirmation', 'token'
		);

		$response = Password::reset($credentials, function($user, $password)
		{
			$this->setNewPassword($user, $password);
		});
		event('password.change', $request);

		switch ($response)
		{
			case Password::PASSWORD_RESET:
                /*
                 * return an access_token
                 */
                $login_request = $request->only([
                    'client_id',
                    'client_secret',
                    'grant_type',
                    'password',
                    'username',
                    'email'
                ]);
                $login_request['username'] = $login_request['email'];
                $proxy = \Request::create(
                    'oauth/token',
                    'POST'
                );
                return \Route::dispatch($proxy);

			default:
				return $this->response->error($response, 422);
		}
	}

	/**
	 * Reset the given user's password.
	 *
	 * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
	 * @param  string  $password
	 * @return void
	 */
	protected function setNewPassword($user, $password)
	{
	    \Log::info($password);
		$user->updatePassword($password);
	}

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword()],
            'new_password' => ['required'],
            'new_confirm_password' => ['same:new_password'],
        ]);

        auth()->user()->updatePassword($request->new_password);


        return $this->response->array([
            'success' => true
        ]);
    }


}
