<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RecaptchaV3 implements Rule
{
    protected $error_codes;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
//        return true;
        // Reference: https://codeforgeek.com/google-recaptcha-v3-tutorial/
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = ['secret' => config('services.recaptcha.secret_key'), 'response' => $value];
        $options = ['http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]];
        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $response_keys = json_decode($response, true);
        if (!$response_keys['success']) {
            $this->error_codes = $response_keys['error-codes'];
        }
        return $response_keys['success'];
    }
    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        $msg = 'Recaptcha failed';
        if (!empty($this->error_codes)) {
            $msg = implode(', ', $this->error_codes);
        }
        return $msg;
    }
}
