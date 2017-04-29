# List comments

 Lists the comments for a given story. 
 
# Create new comment (*Authentication required*)
 
 Post a new comment in a given story.  
 
 **Request:**
 
 ```
 POST /stories/<story id>/comments 
  
 {
   'name': <name>,
   'content': <content>,
   'avatar': <avatar>,
   'url': <url>
 }
 ```

 - name: name of the author of the comment.
 - content: a draft-js raw state object.
 - avatar: url to the user avatar.
 - url: link to the user profile.
 