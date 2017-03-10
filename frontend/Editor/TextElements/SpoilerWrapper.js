import React from 'react';
import Spoiler from './Spoiler';

class SpoilerWrapper extends React.Component {
	
	constructor(props) {	  	  
	  super(props);  
	}
	
	render() {
	  const {decoratedText} = this.props;     	 
	  return (
		<Spoiler text={decoratedText} />
	  );
	}
}

export default SpoilerWrapper;