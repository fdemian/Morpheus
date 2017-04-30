import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

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

const UserLink = ({userHref, author}) => {
  
  return(
   <Link to={userHref}>
	  <Avatar src={"static/avatars/" + author.avatar} size={40} />
	  <span style={authorTextStyle}>
	    {author.name}
	  </span>		    
  </Link>
  );	
	
}

export default UserLink;