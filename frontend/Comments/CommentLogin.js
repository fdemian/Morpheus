import React from 'react';
import format_title_string from '../utils/formats';
import OAuthButtons from '../Login/OAuthButtons';

const CommentLogin = ({storyId, storyName, providers}) => {
  return(
  <div style={{'textAlign':'center', 'marginBottom': '100px', 'marginTop': '40px'}}>
  	<hr />
    <h1>Log in to comment</h1>
    <OAuthButtons providers={providers} isLogin={true} />
  </div>
  );
}

export default CommentLogin;