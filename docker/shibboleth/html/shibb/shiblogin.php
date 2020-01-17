<?php
try {

    $backend_url = getenv("IDENTITY_PROVIDER_BACKEND_SIGNUP");
    $frontend_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK") . "error=1";
    //$headers = getallheaders();
    $json_data = json_encode([
        'provider_id' => $_SERVER['persistent-id'],
        'email' => $_SERVER['mail'],
        "name" => $_SERVER['givenName'],
        "surname" => $_SERVER['sn'] ?? $_SERVER['givenName'],
        //"identity-provider" => $_SERVER["Shib-Identity-Provider"]
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
        ],
        'ignore_errors' => true
    ]);
    $rawdata = file_get_contents($backend_url, false, $context);
    $data = json_decode($rawdata, true);
    /*
     * TODO: qui ci mettiamo il success
     */
    if(strlen($data['refresh_token'])>0)
        $frontend_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK") . $data['refresh_token'];
} catch (\Exception $ex) {
    /*
     * TODO: qui ci mettiamo il return error
     */
}

echo "<pre>";
print_r($_SERVER);
echo "</pre>";
echo "<pre>";
print_r($json_data);
echo "</pre>";
echo "<pre>";
print_r($backend_url);
echo "</pre>";
echo "<pre>";
print_r($rawdata);
echo "</pre>";
echo "<pre>";
print_r($data);
echo "</pre>";
var_dump($http_response_header);
die;

header("location: $frontend_url");

