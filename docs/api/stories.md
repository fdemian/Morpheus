
# List stories

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

# Create new story (*Authentication required*)

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

# Update a story (*Authentication required*)



# Delete a story (*Authentication required*)

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
