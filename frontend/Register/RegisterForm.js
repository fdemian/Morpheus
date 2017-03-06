import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class RegisterForm extends Component {

 constructor(props) {
   super(props)
   this.state = {emailValue: "", nameValue: "", usernameValue: "", passwordValue: ""};
   this.onEmailChange = this.onEmailChange.bind(this);
   this.onUsernameChange = this.onUsernameChange.bind(this);
   this.onNameChange = this.onNameChange.bind(this);
   this.onPasswordChange = this.onPasswordChange.bind(this);
 }

 componentWillReceiveProps(nextProps){
    const { email, username, name} = nextProps;
    this.setState({emailValue: email,usernameValue: username, nameValue: name});
 }

 onEmailChange(event){
    this.setState({emailValue: event.target.value});
    this.props.onEmailUpdate(event.target.value);
 }

 onNameChange(event){
    this.setState({nameValue: event.target.value});
    this.props.onNameUpdate(event.target.value);
 }

 onUsernameChange(event){
    this.setState({usernameValue: event.target.value});
    this.props.onUsernameUpdate(event.target.value);
 }

 onPasswordChange(event){
    this.setState({passwordValue: event.target.value});
    this.props.onPasswordUpdate(event.target.value);
 }

 render() {
  
  return(
   <div>

      <div>
          <TextField floatingLabelText="Email" type="email" fullWidth={true}
              value={this.state.emailValue} onChange={this.onEmailChange}
          />
      </div>
      <div>
         <TextField floatingLabelText="Username" type="text" fullWidth={true}
              value={this.state.usernameValue} onChange={this.onUsernameChange}
          />
      </div>
      <div>
         <TextField floatingLabelText="Name" type="text" fullWidth={true}
              value={this.state.nameValue} onChange={this.onNameChange}
         />
      </div>
      <div>
         <TextField floatingLabelText="Password" type="password" fullWidth={true}
              value={this.state.passwordValue} onChange={this.onPasswordChange}
         />
      </div>
  </div>
  );

 }
}

export default RegisterForm;
