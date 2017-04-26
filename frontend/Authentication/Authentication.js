import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Fetching from '../Fetching/FetchingIndicator';

class AuthDialog extends Component {

 contextTypes: {
    router: React.PropTypes.func
 }

 constructor(props) {
   super(props)
 }

 componentWillMount(){
		
   const {query, hash, search, pathname} = this.props.location;
   const {code, redirectPath, state, method} = query;
   const {history, performAuth, performRegistration} = this.props;
   const authType = state;
   console.log(this.props);
   console.log
   let authenticateUser = false;

   if(code)
   {

      let redirectURL ="/";

      if(redirectPath != null && redirectPath != "/")
         redirectURL = "/" + redirectPath;
		
	  const BASE_URL = window.location.protocol + "//" + window.location.host;
	  const authRedirectURL = BASE_URL + pathname + "?method=" + method;
	  
      if(method == "login")
      {
		 // El usuario redirigio para loguearse por oauth. User y password nulos.
         const username = "";
         const password = "";		 

         performAuth(authType, code, authRedirectURL, username, password);
      }
      else
      {
         performRegistration(authType, code, authRedirectURL);
      }
	  
	  history.push(redirectURL);
   }

 }

 render() {
   return <Fetching />;
 }

}

const WrapperAuth = withRouter(AuthDialog, { withRef: true })

export default WrapperAuth;