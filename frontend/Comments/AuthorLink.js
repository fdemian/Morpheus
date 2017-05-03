import React from 'react';
import Avatar from 'material-ui/Avatar';

const authorTextStyle = {
 'color': 'blue',
 'marginTop': '13px',
 'marginLeft': '20px',
 'display': 'inline-block',
 'verticalAlign': 'top',
 'fontSize': '20px',
 'display': 'inline-block',
 'marginTop': '7px'
};


const AuthorLink = ({comment}) => {

   const avatarHref = "/static/avatars/" + comment.avatar;

   return(
   <div>
	  <Avatar src={avatarHref} size={40} />
	  <span style={authorTextStyle}>
         {comment.author}
	   </span>
   </div>
   );
}

export default AuthorLink;