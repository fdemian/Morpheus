import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ConfirmIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';

const URLInput = ({changeFn, urlValue, confirmFn, cancelFn}) => {
  
 return(
 <span>
  
   <span >
      <TextField 
	    name={"URL input"} 
		onChange={changeFn} 
		value={urlValue} 
		hintText="Enter URL"
		style={{'width': '400px', 'marginLeft': '40px'}}
	  />
   </span>

   <span style={{'marginLeft': '8px'}}>   
      <FlatButton
        icon={<CancelIcon color="red" />}
  	    onClick={cancelFn}  
        hoverColor="white"
		style={{'minWidth': '30px'}}
      />  	      
      <FlatButton
        icon={<ConfirmIcon color="green" />}
  	    onClick={confirmFn}
        hoverColor="white"
		style={{'minWidth': '30px'}}
      />	  
   </span>
	 
 </span>
 );
  
}

export default URLInput;