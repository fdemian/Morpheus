import React from 'react';
import UserMenu from './UserMenu/UserMenu';
import NotificationsMenu from './NotificationsMenu/ConnectedNotificationsMenu';

const AccountMenu = ({user, onLogoutClick}) => {

 return(
  <div>
    <NotificationsMenu  />
    <UserMenu user={user} logoutFn={onLogoutClick} />
  </div>
 );

}

export default AccountMenu;