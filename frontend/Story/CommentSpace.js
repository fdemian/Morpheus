import React from 'react';
import CommentBox from '../Comments/Container';
import CommentLogin from '../Comments/CommentLogin';

const CommentSpace = ({isLoggedIn, id, title, oauthProviders}) => {
    if(isLoggedIn)
       return <CommentBox />;
    else
      return <CommentLogin storyId={id} storyName={title} providers={oauthProviders} />;
}

export default CommentSpace;