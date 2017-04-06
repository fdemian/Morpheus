import React from 'react';
import UserMenu from './UserMenu';
import NotificationsMenu from './ConnectedNotificationsMenu';

const AccountMenu = ({user, notifications, onLogoutClick}) => {

 return(
  <div>
    <NotificationsMenu notifications={notifications} />
    <UserMenu user={user} logoutFn={onLogoutClick} />
  </div>
 );

}

export default AccountMenu;