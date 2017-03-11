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
		
   const {query, hash} = this.props.location;
   const {code, redirectPath, authType, method} = query;
   const {router, performAuth, performRegistration} = this.props;
   
   let authenticateUser = false;

   if(code)
   {

      let redirectURL ="/";

      if(redirectPath != null && redirectPath != "/")
         redirectURL = "/" + redirectPath;

      if(method == "login")
      {
         const username = "";
         const password = "";

         const authRedirectURL = window.location.protocol + "//" + window.location.host + redirectURL + "auth";

         performAuth(authType, code, authRedirectURL + "?authType=" + authType, username, password);
      }
      else
      {
        performRegistration(authType, token);
      }
	  
	  router.replace(redirectURL);
   }

 }

 render() {
   return <Fetching />;
 }

}

const WrapperAuth = withRouter(AuthDialog, { withRef: true })

export default WrapperAuth;