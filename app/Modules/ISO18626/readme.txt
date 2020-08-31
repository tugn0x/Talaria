Questa cartella contiene le classi necessarie alla gestione del protocollo ISO 18626
(http://illtransactions.org/)

Il modulo è agganciato a Laravel tramite un Middleware che valida le richiesta in ingresso
assicurando che siano in formato XML.
Tutte le rich iso18626 vengono gestite tramite la route <API_DOMAIN>/iso18626 
(gestita dal controller apposito)
E' stato implementato anche un ServiceProvider ma al momento è disattivato
perchè tutta la logica veniva gestita in modo comodo anche direttamente dal Middleware stesso

Il protocollo accetta chiamate in HTTP POST con content-type XML e xml valido
secondo l'XSD ISO-18262.xsd 
