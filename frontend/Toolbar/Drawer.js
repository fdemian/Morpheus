import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

const Drawer = ({state}) => {
  this.state = {open: false};
}

export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
   
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer 
		  width={200} 
		  docked={false}
		  openSecondary={true} 
		  open={this.state.open} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
    );
  }
}