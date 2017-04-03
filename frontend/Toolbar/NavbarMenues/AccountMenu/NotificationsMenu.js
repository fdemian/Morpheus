import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Message from 'material-ui/svg-icons/communication/message';
import Mail from  'material-ui/svg-icons/communication/email';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const DefaultNotification = <MenuItem value={-1} key={-1} primaryText="No new notifications." />;

class NotificationsMenu extends Component {

 constructor(props) {
   super(props)
   this.onInit = this.props.onInit;
 }

 componentDidMount() {
   this.onInit();
 }

 render() {

  console.log(this.props.notifications);

  return (
	<IconMenu
	 iconButtonElement={
	     <Badge badgeContent={this.props.notifications.length} secondary={true} badgeStyle={{top: 12, right: 12}} >
	        <IconButton disableTouchRipple={true} tooltip="Notifications">
               <NotificationsIcon color="gainsboro" />
	        </IconButton>
	     </Badge>
	 }
	 targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
	 anchorOrigin={{horizontal: 'left', vertical: 'top'}}
	>
	{this.props.notifications.length == 0 ? (DefaultNotification) :
	  (this.props.notifications.map((notification, i) =>
          <MenuItem value={i} key={i} primaryText={notification.text} />
      ))
    }
	</IconMenu>
  );

 }

}

export default NotificationsMenu;
