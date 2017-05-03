import React from 'react';
import { Link } from 'react-router-dom';
import Renderer from '../Story/DraftRenderer';
import CommentActions from './CommentActions';
import AuthorLink from './AuthorLink';

const Comment = ({comment, loggedIn}) => {

   const rawContent = JSON.parse(comment.content);

   return(
   <div>

     <div>
       <AuthorLink comment={comment} />
	 </div>

     <div>
	   <Renderer raw={rawContent} />
     </div>

     <div>
       <CommentActions loggedIn={loggedIn} />
	 </div>

   </div>
   );
}

export default Comment;
