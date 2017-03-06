import React from 'react';
import RegisterForm from './RegisterForm';
import FlatButton from 'material-ui/FlatButton';
import AcctionInput from 'material-ui/svg-icons/action/input';
import OAuthButtons from '../Login/OAuthButtons';
import cssModules from 'react-css-modules';
import Styles from './Styles.scss';

const Register = ({user, isLoggedIn, error, onRegisterClick, updateEmail, updateName, updateUsername, updatePassword,
oauthProviders}) => {

  let emailValue = "";
  let usernameValue = "";
  let nameValue = "";

  if(error)
	  return <p>There was an error with the registration process.</p>

  if(isLoggedIn)
    return <div><p>You be been sucessfully registered</p></div>;

  if(user)
  {
    emailValue = user.email;
    usernameValue = user.name;
    nameValue = user.name;
  }

	return (
	<div styleName="Register">

        <div styleName="Register Title">
            <h1>Create a new account</h1>
        </div>

       <RegisterForm
            onEmailUpdate={updateEmail}
            onNameUpdate={updateName}
            onUsernameUpdate={updateUsername}
            onPasswordUpdate={updatePassword}
            email={emailValue}
            name={nameValue}
            username={usernameValue}
        />

        <div>
            <FlatButton
                label="Register"
                labelPosition="before"
                hoverColor="gainsboro"
                labelStyle={{'color': '#3b5998'}}
                icon={<AcctionInput color='#3b5998' />}
                onClick={onRegisterClick}
                styleName="RegisterButton"
                style={{'width': '100%'}}
            />
        </div>

        <div styleName="Register SocialLogins">
           <h1>Alternative registration</h1>
           <OAuthButtons providers={oauthProviders} isLogin={false} />
        </div>

	</div>
	);

}

export default cssModules(Register, Styles, { allowMultiple: true });
