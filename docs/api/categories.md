# List categories

List all categories for all posts. On success you will receive an array of JSON objects, 
where each object represents a single story.

Sample request:

```
GET /categories

{
  "data": [
  {
     "id": 1,
	 "name": "foo"	
  }
  ...
  ],
}
```

# Create new category (*Authentication required*)

Sample request:

```
POST -d '{'categoryName': 'name'}' /categories

{
  "data": [
  {
     "id": 1,
	 "name": "foo"	
  }
  ...
  ],
}
```
