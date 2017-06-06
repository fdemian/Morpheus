# Authentication

## Login (authenticate user)
  
  **Request:**
  
  ```
  POST /auth
    
  {
     "authType": <type>,
     "code": <code>,
	 "redirectURL": <redirectURL>,
	 "username": <username>,
	 "password": <password>
  }
  ```
  
  + authType: the type of authentication. It can be either:  
    - "database" (local authentication within the database)
    - A valid Oauth2 service (Facebook, Google, Github...etc).   
  + code: the authorization code given by the oauth2 provider.  
  + redirectURL: the redirectURL specified to the oauth provider.
  + username: the username (not needed for Oauth login flows).
  + password: the password (not needed for Oauth login flows).      
  
  **Response**: 
  
  ```
  {
	'token': token
	'user': user,
	'type': authType
  }
  ```
  
  +	token : the JWT token.
  + user: the user data (name, avatar, etc...).
  + type: type of authentication used.

  ## Logout
  
   **Request:**
  
  ```
  POST /auth/logout  
  ```
  
  **Response:**
  
  ```
  {
	status: "ok"
  }
  ```