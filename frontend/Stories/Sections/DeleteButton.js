import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const DeleteButton = ({deleteFn, story, loggedIn}) => {
  
  if(loggedIn){
   return(
   <span onClick={() => deleteFn(story.id)}>
      <IconButton tooltip="Delete">
         <DeleteIcon color='#3b5998' />
      </IconButton>
   </span>
   );
  }
  else
	return null;
}

export default DeleteButton;