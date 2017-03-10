import React from 'react';
import cssModules from 'react-css-modules';
import Styles from './Spoiler.scss';

class Spoiler extends React.Component {
	
	constructor(props) {	  	  
	  super(props); 	  
      this.state = {textStatus: "Concealed"};	  	  
	}
	
	changeStatus()
	{
	  const {textStatus} = this.state;
      const newStatus = textStatus == "" ? "Concealed" : "";
	  this.setState({textStatus: newStatus});
	}

	render() {
	  
      const cssClass = "Spoiler " + this.state.textStatus;
	  return (
		<span styleName={cssClass} onClick={this.changeStatus.bind(this)}>
		 {this.props.text}
		</span>
	  );
	}
}

export default cssModules(Spoiler, Styles, { allowMultiple: true });