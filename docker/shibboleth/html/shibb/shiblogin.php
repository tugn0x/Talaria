<?php
try {

    $backend_url = getenv("IDENTITY_PROVIDER_BACKEND_SIGNUP");
    $frontend_url = getenv("IDENTITY_PROVIDER_FRONTEND_CALLBACK") . "error=1";
    //$headers = getallheaders();
    
    //NB:questi campi vanno a laravel e vengono memorizzati nell'utente (quindi i campi devono esistere nel model)
    $json_data = json_encode([
        'provider_id' => $_SERVER['persistent-id'],       
        'email' => ($_SERVER['mail']!=null?$_SERVER['mail']:($_SERVER['eppn']!=null?$_SERVER['eppn']:'')),
        "name" => ($_SERVER['givenName']!=null?$_SERVER['givenName']:''),
        "surname" => ($_SERVER['sn']!=null?$_SERVER['sn']:''),                    
    ]);    

    $front_extra_data=array();

    if (isset($_SERVER["Shib-Identity-Provider"]) && $_SERVER["Shib-Identity-Provider"]!='') 
        $front_extra_data["identity-provider"]=$_SERVER["Shib-Identity-Provider"];

    if (isset($_SERVER["affiliation"]) && $_SERVER["affiliation"]!='')
        $front_extra_data["affiliation"]=$_SERVER["affiliation"];
    
    if (isset($_SERVER["entitlement"]) && $_SERVER["entitlement"]!='')
        $front_extra_data["entitlement"]=$_SERVER["entitlement"];    

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

    if(!empty($front_extra_data))    
        $frontend_url.="&".http_build_query($front_extra_data);

} catch (\Exception $ex) {
    /*
     * TODO: qui ci mettiamo il return error
     */
}

// COMMENTARE DA QUI
/*
echo "<h1>IDEM DEBUG</h1><pre>";
print_r($_SERVER);
echo "</pre>";
echo "<pre>";
print_r($json_data);
echo "</pre>";
echo "<pre>";
print_r($front_extra_data);
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
var_dump($frontend_url);
die;
*/
// COMMENTARE FIN QUI


header("location: $frontend_url");

