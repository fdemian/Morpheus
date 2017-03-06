import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import InsertFile from 'material-ui/svg-icons/editor/insert-drive-file';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

const UserMenu = ({user, logoutFn}) => {

  const avatarSrc = "static/avatars/" + user.avatar;

  return(
  <IconMenu iconButtonElement={
    <span>
      <IconButton disableTouchRipple={true} tooltip={user.username} >
        <Avatar src={avatarSrc} size={40} />
	  </IconButton>
	</span>
    }
    style={{'cursor': 'pointer'}}
	targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
	anchorOrigin={{horizontal: 'left', vertical: 'top'}}
   >
   <MenuItem primaryText={user.username} disabled={true} />
   <Divider />
   <MenuItem primaryText="Sign Out" leftIcon={<Exit />} onClick={logoutFn} />         
  </IconMenu>
  );

}

export default UserMenu;
