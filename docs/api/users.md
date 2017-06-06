 # Users
 
 ## List all users
 
 **Request:**

 ```
 GET /users
 ```

 **Response:**

 Returns an array of user objects.
 
 ```
 [{
		"id": <id>,
		"name": <name>,
		"username": <username>,
		"status": <status>,
		"avatar": <avatar>,
		"userCard": <userCard>
 }]
 ```
 
 - id: id of the user.
 - avatar: path to the user avatar.
 - userCard: not used for the moment.
 - name: full name of the user.
 - status: user role (moderador, commenter).
 - username: user nickname. 
 
 ## Get a user

 **Request:**

 ```
 GET /users/<id>
 ```
 
 - id: the id of the user to query.

 **Response:**

 ```
 {
	"user": {
		"id": <id>,
		"avatar": <avatar>,
		"userCard": <userCard>,
		"name": <name>,
		"status": <status>,
		"username": <username>
	}
 }
 ```
 
 - id: id of the user.
 - avatar: path to the user avatar.
 - userCard: not used for the moment.
 - name: full name of the user.
 - status: user role (moderador, commenter).
 - username: user nickname. 
 
 ## Create a new user
 
 **Request:**
 
 ```
 POST /users/
 
 {
	"email": <email>
	"name": <name>
	"password": <password>
	"type": <authType>
	"username": <username>
 }
 ```
 
 **Response:**
 
 ```
 {
	"validated": True,
	"user": registered_user,
	"token": jwt_token.decode("utf-8"),
	"type": register_type
 }
 ```
 
 - validated: boolean indicating whether the user email has been validated. For email login flows the user is considered to not be validated until it has authenticated itself.
 - user: the user object representing the registered user or null if validated is false.
 - token: the jwt token if the user is validated, null otherwise.
 - type: registration type.
 