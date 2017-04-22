import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Message from 'material-ui/svg-icons/communication/message';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import NotificationsOffIcon from 'material-ui/svg-icons/social/notifications-off';
import Clear from  'material-ui/svg-icons/communication/clear-all';
import { Link } from 'react-router-dom';
import { format_link_string } from '../../../../utils/formats.js';

/*
    <Divider />
   <MenuItem value={-2} key={-2} primaryText="See all notifications" leftIcon={<NotificationsIcon />} />
*/

function markAllAsRead(notifications, markAsReadFn)
{

    if(notifications.length == 0)
       return;

    for(const notification of notifications)
    {
        markAsReadFn(notification);
    }
}

const DefaultNotification = <MenuItem value={-1} key={-1} primaryText="No new notifications." />;

class NotificationsMenu extends Component {

 constructor(props) {
   super(props)
   this.onInit = this.props.onInit;
 }

 componentDidMount() {
   if(this.props.notificationsEnabled)
       this.onInit();
 }

 render() {

  if(!this.props.notificationsEnabled)
    return(
    <IconButton disableTouchRipple={true} tooltip="Notifications" disabled={true}>
            <NotificationsOffIcon color="gainsboro" />
     </IconButton>
    );


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
    {this.props.notifications.length == 0 ? (DefaultNotification) : (
       this.props.notifications.map((notification, i) =>
	    <Link to={format_link_string(notification.link)} key={i}  style={{textDecoration: 'none'}} >
          <MenuItem value={i} key={notification.id} primaryText={notification.text} onClick={() => this.props.onRead(notification)} />
        </Link>
       )
     )
     }
        <Divider />
        <MenuItem value={-3} key={-3} primaryText="Mark all as read" leftIcon={<Clear />} onClick={() => markAllAsRead(this.props.notifications, this.props.onRead)} />
     </IconMenu>
  );

 }

}

export default NotificationsMenu;
