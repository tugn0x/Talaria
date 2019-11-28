<html>
<body>
Stampa delle variabili delle variabili Shibboleth
<p>
    <?
    
        while (list($key, $value) = each($_SERVER))
        {
            echo "<b>$key:</b> $value<br />";
        }
    ?>
</p>
</body>
</html>
