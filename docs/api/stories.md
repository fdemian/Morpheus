
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

# Create new story (**Authentication required**)

# Delete a story (**Authentication required**)

# Update a story (**Authentication required**)


