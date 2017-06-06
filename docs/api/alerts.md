  # Alerts
  
  This is and enpoint for querying user notifications and alerts.
 
  # Get all alerts for a given user. (*Authenticated method*)
  
  This is an authenticated method and currently obtains the alerts for the currently authenticated user only.
   
  **Request:**

  ```
  GET /alerts
  ```
 
  **Response:**

  ```
  [{
	 "text": <text>,
	 "id": <id>,
	 "read": <read>,
	 "type": <type>,
	 "link": <link>
  }]
  ```
  
  - text: text of the alert.
  - id: id of the alert.
  - read: boolean indicating whether the alert has been read or not.
  - type: type of the alert.
  - link: link redirecting to where the alert originated.
  