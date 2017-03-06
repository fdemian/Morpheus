import React from 'react';

export default class BannerImage extends React.Component {

 render() {
    return (
    <img
     src={this.props.src}
 	 style={{'margin-top': '17px','height': '40px','width': '40px','max-width': '251px','max-height': '40px'}}
     />);
  }
}
