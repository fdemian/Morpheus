import React from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

const EditButton = ({editFn, story, history, loggedIn}) => {

  if(loggedIn){
    return(
    <span onClick={() => editFn(story.id, history)}>
	  <IconButton tooltip="Edit">
          <EditIcon color='#3b5998' />
	  </IconButton>
    </span>
    );
  }
  else
	return null;
}

export default EditButton;