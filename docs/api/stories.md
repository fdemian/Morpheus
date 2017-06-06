# Stories

## Show a story

Get a story.

 **Request:**

 ```
 GET /stories?id=<id>
 ```
 
 - id: the id of the story to query.

 **Response:**

 ```
 {
	"title": <title>,
    "content": <content>,
    "tags": <tags>,
    "comments": <comments>,
    "category": {
       "name": <categoryName>,
       "id": <categoryId>
	},
    "id": <storyId>
 }
 ```
 
 - title: title of the story.
 - content: content of the story.
 - tags: comma separated list of tags.
 - comments: array of comments.
 - category: category the story belongs to.
   - categoryName: the name of the category.
   - categoryId: the id of the category.
 - id: id of the story.

## List stories

 List all stories posted by all the users.

 **Request:**

 ```
 GET /stories

 [
   {
     "id": 1,
	 "name": "foo",
	 "category": <category>,
	 "author": <author>,
	 "content": "<content>",	 
	 "replies": 0,
	 "views": 0
   }
  ...
 ]
 ```

 - category: a category object.
 - author: the author of the story (a user object)
 - content: a is a draftJS raw state JSON.

## List stories for a given user.
 
 **Request:**
 
 ```
 GET /users/1/stories
 ```
 
 **Response:**
 
 ```
 [{
	"id": <id>,
	"category": {
		"id": <categoryId>,
		"name": <categoryName>
	},
	"views": <views>,
	"name": <name>,
	"author": {
		"id": <authorId>,
		"name": <authorName>,
		"avatar": <authorAvatar>
	},
	"replies": <replies>
 }]
 ```
 
 - id: id of the story.
 - category: category the story belongs to.
   - categoryId: id of the category.
   - categoryName: name of the category.
 - views: not used currently.
 - name: name of the story.
 - author: author of the story.
   - id: id of the author.
   - name: name of the author.
   - avatar: url to the author avatar.
 - replies: not used currently.
 
 ## List stories for a given category.
 
 **Request:**
 
 ```
 GET /categories/<categoryId>/<page>
 ```
 
 - categoryId: id of the category to query.
 - page of the results to obtain.
 
 **Response:**
 
 ```
 {
	"totalPages": <totalPages>,
	"currentPage": <currentPage>,
	"items": [{
		"id": <id>,
		"name": <storyName>,
		"author": {
			"id": <authorId>,
			"name": <authorName>,
			"avatar": <avatar>
		}
	}]
 }
 ```
 - totalPages: number of pages in total.
 - currentPage: current page of results.
 - items: array containing all the stories for the given category.
    - id: id of the story.
    - name: id of the stories.    
    - author: author of the story.
      - id: id of the author.
      - name: name of the author.
      - avatar: url to the author avatar.
 
## Create new story (*Authentication required*)

 ```
 POST /stories

 {
   "title": <title>,
   "tags": <tags>,
   "content": <content> ,
   "author": <author>,
   "category": <category>
 }
 ```

 - title: title of the story
 - tags: comma separated values
 - content: a draf-js raw state JSON object.
 - author: author id.
 - category: category id.

 **Response:**

 ```
 {
	"id": <id>,
	"saved": <saved>
 }
 ```

 - id: id of the saved story.
 - saved: indicates if the story was saved or not.

## Update a story (*Authentication required*)

 **Request:**
 ```
 PUT /story/<id>

 {
   "title": <title>
   "content": <content>
   "tags": <tags>
   "category": <category>
 }
 ```
 
 - title: title of the story to update.
 - content: a draft-js raw state JSON object.
 - tags: comma separated string of tags.
 - category: id of a category.

 **Response:**

 ```
 {
   'id': <id>
 } 
 ```
 
 - id: id of the story that has been updated.
 
## Delete a story (*Authentication required*)

 **Request:**
 
 ```
 DELETE /stories/<id>
 ```

 - id: id of the story to delete.

 **Response:**

 ```
 {  
    "id": <id>
 }
 ```

 - id: id of the story to delete.
