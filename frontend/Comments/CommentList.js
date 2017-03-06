import React from 'react';
import { Link } from 'react-router';
import Comment from './Comment';

const textStyles = { 'textAlign' : 'center' };

const CommentList = ({comments, loggedIn}) => {

  if(comments.length == 0)
  return (
    <div>
      <h1 style={textStyles}>No comments yet</h1>
    </div>
  );

  return(
    <div>
	  {comments.map((comment, i) =>	
	   <div key={i} style={{'marginBottom': '10px'}} >
		  <Comment comment={comment} loggedIn={loggedIn} />
	   </div>
	  )}
    </div>
  );
}

export default CommentList;
