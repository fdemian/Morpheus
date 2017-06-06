# API documentation overview

 This is an overview of the Morpheus REST API.
 
## General considerations
 
 The REST API exposes the following endpoints:
 
 - Authentication
 - Stories
 - Categories
 - Users
 - Comments
 
 Each one is detailed in its own document. 

## Errors

If you make an invalid request or there is otherwise an error in the request you will 
recieve a JSON response with the corresponding error code set and the following format:

 ```
 {
   "message": <Message>
 }
 ```

Where "Message" is a string explaining the error.

## Authenticated methods

 This application uses [JWT Tokens](https://jwt.io/) to handle authentication. 
 The methods marked (**Authentication required**) require that the user be authenticated when performing the request.
 For example, headers that include a valid authorization token look like this
 
 ```
 Accept:*/*
 Accept-Encoding:gzip, deflate
 Accept-Language:es-ES,es;q=0.8,en;q=0.6
 authorization:Bearer <token>
 Connection:keep-alive
 Content-Length:1181
 content-type:application/x-www-form-urlencoded
 Host: foo
 Origin: bar
 Referer: baz
 User-Agent: <user agent string>
 ```
 
 Where <token> is the JWT token provided by the application upon successful authentication.  
 If a valid token is not included in a request headers to a method that requires authentication you will recieve the following error object:

 ```
 {
   "message": "Authorization error."
 }
 ```
