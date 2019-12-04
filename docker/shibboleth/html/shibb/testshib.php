<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <html>
  <head>
   <title>Example PHP Federated Application</title>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
   <p>
    <a href="https://sp.example.org/privacy.html">Privacy Policy</a>
   </p>
   <?php
    //The REMOTE_USER variable holds the name of the user authenticated by the web server.
    $name = getName();
    print "<h1>Ciao " . $name . "!!!</h1>";

    print "<p>Let see all other attributes:</p>";
    print "<p>Your REMOTE_USER is <strong>" . $_SERVER["REMOTE_USER"] . "</strong></p>";
    print "<p>Your IDP Entity ID is <strong>".$_SERVER["Shib-Identity-Provider"]."</strong></p>";    
    print "<p>Your persistent-id is <strong>".$_SERVER["persistent-id"]."</storng></p>";    
    print "<p>Your affiliation is <strong>" . $_SERVER["affiliation"] . "</strong></p>";
    print "<p>Your eduPersonPrincipalName is <strong>" . $_SERVER["eppn"] . "</strong></p>";
    print "<p>Your schacHomeOrganization is <strong>" . $_SERVER["schacHomeOrganization"] . "</strong></p>";
    print "<p>Your schacHomeOrganizationType is <strong>" . $_SERVER["schacHomeOrganizationType"] . "</strong></p>";
    print "<p>Your email is <strong>" . $_SERVER['mail'] . "</strong></p>";
    

    print "<hr/>Now all SERVER variables:<br/>";
    print_r($_SERVER);
   ?>
  </body>
 </html>

 <?php
 function getName() {
  if (array_key_exists("displayName", $_SERVER)) {
  return implode(" ", explode(";", $_SERVER["displayName"]));
  } else if (array_key_exists("cn", $_SERVER)) {
  return implode(" ", explode(";", $_SERVER["cn"]));
  } else if (array_key_exists("givenName", $_SERVER) && array_key_exists("sn", $_SERVER)) {
  return implode(" ", explode(";", $_SERVER["givenName"])) . " " .
  implode(" ", explode(";", $_SERVER["sn"]));
  }
  return "Unknown";
 }
?>