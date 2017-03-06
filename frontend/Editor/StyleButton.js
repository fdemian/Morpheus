import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import IconButton from 'material-ui/IconButton';
import Styles from './css/StyleButton.scss';


class StyleButton extends Component {

   constructor(props) {
     super(props);

     this.onToggle = (e) => {
           e.preventDefault();
           this.props.onToggle(this.props.style);
     };

	 this.activeFn = this.props.activeFn;
   }

   
   render() {	  

      const isActive = this.activeFn(this.props.style);
      const IconColor = (isActive ? 'black' : 'gainsboro');
      const Icon = this.props.icon;

      return (
       <IconButton tooltip={this.props.label} onMouseDown={this.onToggle} >
        <Icon color={IconColor} />
       </IconButton>
      );
    }
}

export default cssModules(StyleButton, Styles, { allowMultiple: true });

