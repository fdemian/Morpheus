# Stories

## Show a story


List all stories posted by all the users. On success you will receive an array of JSON objects, 
where each object represents a single story.

**Request:**

 ```
 GET /story/<id>
 ```
 
 - id: the id of the story to query.

**Response:**

 ```
 {
    "data": {
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

List all stories posted by all the users. On success you will receive an array of JSON objects, 
where each object represents a single story.

Sample request:

```
GET /stories

{
  "data": [
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
  ],
}
```

Where category is a category object, author is a user object and <content> is a raw draftJS
content object.

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
  "data": {
	"id": <id>,
	"saved": <saved>
  }
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
   'data': 
    {
	  'id': <id>
	}
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
  "data": {
    "id": <id>
  }
}
```

- id: id of the story to delete.