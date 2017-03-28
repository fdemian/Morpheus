# Configuration options

## Server config
 
 - port (**required**): port used to serve the application. 
 - autoreload: indicated whether to autoreload the application in the event of code changes.

## Security options

 - serve_https: indicates if the application will be served through https or not.
 - cookie_secret: secret used to generate cookies.
 - ssl_cert: location of the ssl certificate.
 - ssl_key: location of the ssl key.

## Logging

 -log_file_prefix: location of the pysical log file. Uncommenting this line logs to a file instead of the console.

## Configuration email options
 
 - from_address
 - mail_template
 - mail_subject
 - mail_host
 - mail_port

## Response options.

 - compress_response

## JWT options

 - jwt_secret: The JWT secret.
 - jwt_algorithm: The algorithm used to encode the JWT token.
 - jwt_expiration_seconds: The expiration time of the JWT token issued by the server.
