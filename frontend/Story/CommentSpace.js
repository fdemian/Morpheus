import React from 'react';

const CommentSpace = ({isLoggedIn, id, title, oauthProviders}) => {
    if(isLoggedIn)
       return <CommentBox />;
    else
      return <CommentLogin storyId={id} storyName={title} providers={oauthProviders} />;
}

export default CommentSpace;