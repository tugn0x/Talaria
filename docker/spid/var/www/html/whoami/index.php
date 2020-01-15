<?php
try {

    $backend_url = getenv("IDENTITY_PROVIDER_BACKEND_SIGNUP");
    $headers = getallheaders();
    $json_data = json_encode([
        'provider_id' => $_SERVER['SPIDCODE'],
        'email' => $headers['EMAIL'],
        "name" => $headers['NAME'],
        "surname" => $headers['FAMILYNAME'],
    ]);
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-type: application/json\r\n" .
                "Accept: application/json\r\n" .
                "Connection: close\r\n" .
                "Content-length: " . strlen($json_data) . "\r\n",
            'protocol_version' => 1.1,
            'content' => $json_data
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);
    $rawdata = file_get_contents($backend_url, false, $context);
    $data = json_decode($rawdata, true);
    /*
     * TODO: qui ci mettiamo il success
     */
    $frontend_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK") . $data['refresh_token'];
} catch (\Exception $ex) {
    echo "<pre>";
    print_r($ex);
    die;
    /*
     * TODO: qui ci mettiamo il return error
     */
    $frontend_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK") . $data['refresh_token'];
}
//echo "<pre>";
//print_r($json_data);
//print_r($backend_url);
//print_r($rawdata);
//print_r($data);
//die;

header("location: $frontend_url");

