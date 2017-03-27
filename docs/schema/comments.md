# List comments

 Lists the comments for a given story. 
 
# Create new comment (**Authentication required**)
 
 Post a new comment in a given story.  
 
 Sample request:
 
 ```
 POST /stories/<story id>/comments -d '{'name': 'foo', 'content': <content>, 'avatar': <avatar>, 'url': <url> }' 
 ```

