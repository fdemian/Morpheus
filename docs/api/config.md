# Configuration options

## Get configuration options

  **Request:**

  ```
  GET /config    
  ```

  **Response**: 

  ```  
  {
	"oauth": [{
		"name": <name>,
		"iconURL": <url>,
		"authorizeURL": <URL>,
		"key": <key>
	}],
	"notificationsEnabled": <enabled>	
  }
  ```
  
  - oauth: an array of oauth2 services to be used.
    - name: lowercase name of the oauth service.
	- iconURL: url of the icon.
	- authorizeURL: oauth url service where to redirect the user for authorization.
	- key: oauth service public key.
  
  - notificationsEnabled: a boolean indicating whether notifications are enabled.