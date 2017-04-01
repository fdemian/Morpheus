import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Message from 'material-ui/svg-icons/communication/message';
import Mail from  'material-ui/svg-icons/communication/email';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const DefaultNotification = <MenuItem value={-1} key={-1} primaryText="No new notifications." />;

const NotificationsMenu = ({notifications, onInit}) => {

 onInit();

 return (
	<IconMenu
	 iconButtonElement={
	     <Badge badgeContent={notifications.length} secondary={true} badgeStyle={{top: 12, right: 12}} >
	        <IconButton disableTouchRipple={true} tooltip="Notifications">
               <NotificationsIcon color="gainsboro" />
	        </IconButton>
	     </Badge>
	 }
	 targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
	 anchorOrigin={{horizontal: 'left', vertical: 'top'}}
	>
	{notifications.length == 0 ? (DefaultNotification) :
	  (notifications.map((notification, i) =>
          <MenuItem value={notification.id} key={notification.id} primaryText={notification.text} />
      ))
    }
	</IconMenu>
   );
}


export default NotificationsMenu;
