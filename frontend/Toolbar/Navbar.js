import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Styles from './css/Toolbar.scss';
import { Link } from 'react-router';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import AccountMenu from './NavbarMenues/AccountMenu/ConnectedAccountMenu';
import LoginMenu from './NavbarMenues/LoginMenu/LoginMenu';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';


const toolbarStyles = {
 'border': '1px solid transparent',
 'position': 'fixed',
 'top': '0px',
 'boxSizing': 'border-box',
 'width':'100%',
 'height':'76px',
 'zIndex':'1024',
 'padding': '0 48px',
 'marginLeft': '-9px',
 'backgroundColor': '#fff',
 'borderColor': '#eee'
};

const toolbarTitleStyles = { 'color': '#3b5998' };

const Navbar = ({ loggedIn, user, notifications }) => {
 
 var isLoggedIn = (loggedIn && user!=null); 
 var Menu = isLoggedIn ? <AccountMenu user={user} notifications={notifications} /> : <LoginMenu />; 
  
 return(
 <Toolbar style={toolbarStyles}>
   <ToolbarGroup >
     <Link to="/">
        <h1 style={toolbarTitleStyles}>Blog Name</h1>
     </Link>
   </ToolbarGroup>
   <ToolbarGroup>
	 {Menu}
   </ToolbarGroup>
 </Toolbar>
 );

}

export default Navbar;