import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ConfirmIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

const URLInput = ({changeFn, urlValue, keydownFn, confirmFn, cancelFn}) => {	
  return(
	<div>
	  <TextField
	   name={"URL input"}
	   onChange={changeFn}
       value={urlValue}
       onKeyDown={keydownFn}
      />
	  <IconButton onClick={cancelFn}>
	    <CancelIcon color="red"/>
	  </IconButton>	  	  
	  <IconButton onClick={confirmFn}>
	    <ConfirmIcon color="green"/>
	  </IconButton>
    </div>
  );	
}

export default URLInput;