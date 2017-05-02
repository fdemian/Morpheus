import React from 'react';

const ErrorMessage = ({error, message}) => 
{
  if(error)
  {
    return(
    <div>
	  <hr />
	    <p>{message}</p>
	  <hr />
    </div>
    );
  }
  else
	return null;
}

export default ErrorMessage;