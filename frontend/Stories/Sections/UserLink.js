import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import format_title_string from '../../utils/formats.js';

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

const UserLink = ({author}) => {
  
  const href = "/users/" + author.id + "/" + format_title_string(author.name);
  
  return(
   <Link to={href}>
	  <Avatar src={"static/avatars/" + author.avatar} size={40} />
	  <span style={authorTextStyle}>
	    {author.name}
	  </span>		    
  </Link>
  );	
	
}

export default UserLink;