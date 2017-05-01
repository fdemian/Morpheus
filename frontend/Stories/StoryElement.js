import React from 'react';
import Divider from 'material-ui/Divider';
import DeleteButton from './Sections/DeleteButton';
import EditButton from './Sections/EditButton';
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
     
  return(
  <div style={containerStyle}>

	 <div>
		<UserLink author={author} />
		<CategorySpan category={category} />
	 </div>
	
	 <div>
		<StoryLink story={story} />
	 </div>

    <div>
      <DeleteButton deleteFn={deleteFn} story={story} loggedIn={loggedIn} />
      <EditButton editFn={editFn} story={story} history={history} loggedIn={loggedIn} />
    </div>

    <Divider />

  </div>		
  );
}

export default StoryElement;
