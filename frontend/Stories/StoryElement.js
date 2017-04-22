import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import format_title_string from '../utils/formats.js';

const linkStyle = {'color': 'blue' };

const linkTextStyle = { 
 'color': 'blue',
 'marginTop': '13px',
 'marginLeft': '20px',
 'display': 'inline-block',
 'verticalAlign': 'top',
 'fontSize': '25px'
};

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

const containerStyle = {
 'marginTop': '20px',
 'marginBottom': '30px',
 'height': '137px',
 'padding': '20px'
};

const StoryElement = ({story, loggedIn, deleteFn, editFn}) => {

  const {category, author} = story;
  const linkToUser = "/users/" + author.id + "/" + format_title_string(author.name);
  const linkToCategory = "/categories/" + category.id + "/" + category.name;
  const linkToStory = "/stories/" + story.id + "/" + format_title_string(story.name);	
  const storyId = story.id;

  const showCategory = category.id != -1;
  let categorySpan;
  let deleteButton;
  let editButton;

  if(showCategory)
	  categorySpan = (<Link to={linkToCategory} activeStyle={linkStyle} >
	      <span style={linkTextStyle}>
			{story.category.name}
		  </span>
	   </Link>);
  else
	  categorySpan = <span></span>;

  if(loggedIn)
  {
    deleteButton = (
      <span onClick={() => deleteFn(storyId)}>
        <IconButton tooltip="Delete">
           <DeleteIcon color='#3b5998' />
         </IconButton>
	   </span>
    );

    editButton = (
       <span onClick={() => editFn(storyId)}>
         <IconButton tooltip="Edit">
           <EditIcon color='#3b5998' />
         </IconButton>
	   </span>
    );
  }
  else
     deleteButton = <span></span>;


  return(
  <div style={containerStyle}>

	 <div>
	   <Link to={linkToUser} activeStyle={linkStyle}>
	      <Avatar src={"static/avatars/" + story.author.avatar} size={40} />
		  <span style={authorTextStyle}>
			{story.author.name}
		  </span>		    
        </Link>
		{categorySpan}
	 </div>
	
	 <div>
		<Link to={linkToStory} activeStyle={linkStyle}>
		  <p style={linkTextStyle}>{story.name}</p>
		</Link>		
	 </div>

    <div>
      {deleteButton}
      {editButton}
    </div>


    <Divider />

  </div>		
  )	
}

export default StoryElement;
