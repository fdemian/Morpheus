 # Categories
 
 ## Get a category
 
 **Request:**
 
 ``` 
 GET categories/<id>
 ```
 
 **Response:**
 
 ```
 {
	"name": <name>,
	"id": <id>
 } 
 ```
  
 - name: name of the category.
 - id: id of the category.
  
 ## List categories

 List all categories for all posts. On success you will receive an array of JSON objects, 
 where each object represents a single story.

 **Request:**

 ```
 GET /categories
 ```
 
 **Response:**
 
 ```
 [{
	"name": <name>,
	"id": <id>
 }] 
 ```
 
 - name: name of the category.
 - id: id of the category.

## Create new category (*Authentication required*)

 **Request:**

 ```
 POST /categories
 
 {
	"name": <name>
 }
 ```
 
 - name: name of the category to create.
 
 **Response:**
 
 ```
 {
  "name": <name>,
  "id": <id>
 }
 ```
 
 - name: name of the category that was just created.
 - id: id of the category that was just created.
