import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const FetchingIndicator = () => {	
  return(
	<div>
	   <CircularProgress size={60} thickness={5} />
	</div>
  );	
}

export default FetchingIndicator;