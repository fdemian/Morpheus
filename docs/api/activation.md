 # User activation

 ## Activate user
 
 **Request:**

 ```
 POST /activation
 
 {
   "code": <code>
 }
 ```

 - code: activation code provided via email.
 
 **Response:**

 ```
 {
	"message": "Account confirmed successfully."
 }
 ``` 