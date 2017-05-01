import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import format_title_string from '../../utils/formats.js';

const linkStyle = {color: 'blue', textDecoration: 'none' };

const StoryLink = ({story}) => {

  const href = "/stories/" + story.id + "/" + format_title_string(story.name);
  
  return(
  <Link to={href} activeStyle={linkStyle} style={linkStyle}>
  	<span style={linkStyle}>
	{story.name}
	</span>
  </Link>	
  );	
	
}

export default StoryLink;