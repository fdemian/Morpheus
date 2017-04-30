import React from 'react';
import { Link } from 'react-router-dom';

const StoryLink = ({storyHref, story}) => {
  
  return(
  <Link to={storyHref}>
	<p style={color:'blue'}>
	  {story.name}
	</p>
  </Link>	
  );	
	
}

export default StoryLink;