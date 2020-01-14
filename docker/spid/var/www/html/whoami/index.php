<?php
$url = getenv("IDENTITY_PROVIDER_BACKEND_SIGNUP");
$return_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK");
$headers = getallheaders();
$json_data = json_encode([
    'provider_id' => $_SERVER['SPIDCODE'],
    'email' => $headers['HTTP_EMAIL'],
    "name" => $headers['HTTP_NAME'],
    "surname" => $headers['HTTP_FAMILYNAME'],
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
$rawdata = file_get_contents($url, false, $context);
if ($rawdata === false) {
    exit("Unable to update data at $url");
}
$data = json_decode($rawdata, true);
if (JSON_ERROR_NONE !== json_last_error()) {
    exit("Failed to parse json: " . json_last_error_msg());
}
echo "<pre>";
print_r($data);
