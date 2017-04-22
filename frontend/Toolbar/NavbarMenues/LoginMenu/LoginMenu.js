import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import FlatButton from 'material-ui/FlatButton';

const LoginMenu = ({onLoginClick}) => {

 return(
 <div>

     <Link to="/login">
        <FlatButton
		  label="Sign In"
          labelStyle={{'color': '#3b5998'}}
          icon={<AccountIcon  color='#3b5998' />}
		/>
     </Link>

     <Link to="/register">
        <FlatButton
		  label="Register"
          labelStyle={{'color': '#3b5998'}}
          icon={<PersonAdd  color='#3b5998' />}
		/>
     </Link>

 </div>
 );

}

export default LoginMenu;
