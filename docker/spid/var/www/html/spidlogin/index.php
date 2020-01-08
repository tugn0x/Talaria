<html>
    <head>
        <title>login spid test page</title>
    </head>
    <body>
        <h1>Login SPID test</h1>
        <h3>da questa pagina poi dovremmo parsare i dati e forwardare al frontend React!</h3>

        <h2>Server Environment</h2>
        <pre><?php print_r($_SERVER); ?></pre>

        <h2>Headers</h2>
        <pre>
        <?php
            foreach (getallheaders() as $name => $value) {
                echo "$name: $value\n";
            }
        ?>
        </pre>
    </body>
</html>