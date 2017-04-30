import React from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import format_title_string from '../utils/formats.js';
import EditButton from './Sections/EditButton';
import DeleteButton from './Sections/EditButton';
import CategorySpan from './Sections/CategorySpan';
import UserLink from './Sections/UserLink';
import StoryLink from './Sections/StoryLink';

const containerStyle = {
 'marginTop': '20px',
 'marginBottom': '30px',
 'height': '137px',
 'padding': '20px'
};

const StoryElement = ({story, history, loggedIn, deleteFn, editFn}) => {

  const {category, author} = story;
  const userHref = "/users/" + author.id + "/" + format_title_string(author.name);
  const categoryHref = "/categories/" + category.id + "/" + category.name;
  const storyHref = "/stories/" + story.id + "/" + format_title_string(story.name);	
  const storyId = story.id;
      
  return(
  <div style={containerStyle}>

	 <div>
		<UserLink userHref={userHref} author={author} />
		<CategorySpan category={category} categoryHref={categoryHref} />
	 </div>
	
	 <div>
		<StoryLink story={story} storyHref={storyHref} />
	 </div>

    <div>
      <DeleteButton deleteFn={deleteFn} storyId={storyId} loggedIn={loggedIn} />
      <EditButton editFn={editFn} storyId={storyId} history={history} loggedIn={loggedIn} />
    </div>

    <Divider />

  </div>		
  )	
}

export default StoryElement;
