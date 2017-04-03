import React from 'react';
import UserMenu from './UserMenu';
import NotificationsMenu from './ConnectedNotificationsMenu';

const AccountMenu = ({user, notifications, onLogoutClick}) => {

 const _notifications = notifications.slice(0, 4);

 return(
  <div>
    <NotificationsMenu notifications={_notifications} />
    <UserMenu user={user} logoutFn={onLogoutClick} />
  </div>
 );

}

export default AccountMenu;