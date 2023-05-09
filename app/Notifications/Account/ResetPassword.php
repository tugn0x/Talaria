<?php

namespace App\Notifications\Account;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class ResetPassword extends Notification
{
    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * The callback that should be used to build the mail message.
     *
     * @var \Closure|null
     */
    public static $toMailCallback;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        $link = 'https://'.config('app.frontend_domain').'/forgot-password/'.$this->token;

        //NOTE: template is in resources/views/vendor/notifications  folder
        //language is taken from user's preferred language 
        return (new MailMessage)
            ->subject(trans('email.password_reset_email_subject',[]))            
            //introLine
            ->line(trans('email.password_reset_email_body',[])) 
//            ->action(Lang::get('Reset Password'), url(config('app.frontend_domain').route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
            ->action(trans('email.password_reset_email_link',[]), $link)
            //outroLine
            ->line(trans('email.password_reset_email_link_expire_warning', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
            ->line(trans('email.password_reset_email_link_no_further_action',[]));
    }

    /**
     * Set a callback that should be used when building the notification mail message.
     *
     * @param  \Closure  $callback
     * @return void
     */
    public static function toMailUsing($callback)
    {
        static::$toMailCallback = $callback;
    }
}
