import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import OAuthButtons from './OAuthButtons';
import {withRouter} from 'react-router';
import cssModules from 'react-css-modules';
import Styles from './Styles.scss';

class Login extends Component {

 contextTypes: {
    router: React.PropTypes.func
 }

 constructor(props) {
   super(props)
   this.oauthProviders = this.props.oauthProviders;
   this.state = { usernameValue: "", passwordValue: "" };
   this.onUsernameChange = this.onUsernameChange.bind(this);
   this.onPasswordChange = this.onPasswordChange.bind(this);
   this.onLoginClick = this.onLoginClick.bind(this);
 }

 onLoginClick(event){
    const username = this.state.usernameValue;
    const password = this.state.passwordValue;
    this.props.localSignIn(username, password)
 }

 onUsernameChange(event){
    this.setState({usernameValue: event.target.value});
    this.props.updateUsername(event.target.value);
 }

 onPasswordChange(event){
    this.setState({passwordValue: event.target.value});
    this.props.updatePassword(event.target.value);
 }


 render() {

  const { history, isLoggedIn } = this.props;

  if(isLoggedIn)
    history.push("/");

  return(
  <div styleName="Login">

        <div styleName="Login Title">
           <h1>Log in to your account</h1>
        </div>

        <div>
            <TextField
               floatingLabelText="Username"
               fullWidth={true}
               value={this.state.usernameValue}
               onChange={this.onUsernameChange}
            />
            <TextField
                 floatingLabelText="Password"
                 type="password"
                 fullWidth={true}
                 value={this.state.passwordValue}
                 onChange={this.onPasswordChange}
             />
        </div>

        <div>
             <FlatButton
                label="Login"
                labelPosition="before"
                onClick={this.onLoginClick}
                hoverColor="#03a9f4"
                style={{'width': '100%'}}
             />
        </div>

        <div styleName="Login SocialLogins">
            <h1>Alternative logins</h1>
            <OAuthButtons providers={this.oauthProviders} isLogin={true} />
        </div>

  </div>
  );

 }
}

const StyledLogin = cssModules(Login, Styles, { allowMultiple: true });
export default withRouter(StyledLogin, { withRef: true });
