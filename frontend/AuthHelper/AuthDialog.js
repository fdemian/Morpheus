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
   const {code, redirectPath, authType} = query;
   const { router } = this.props;
   //const { authenticateUser } = this.props.location.query;
   
   let authenticateUser = false;

   if(redirectPath == null || redirectPath != "register")
      authenticateUser = true;
     
   if(code)
   {

      const {performAuth} = this.props;
      const {registerData} = this.props;

      let redirectURL ="/";

      if(redirectPath != null && redirectPath != "/")
         redirectURL = "/" + redirectPath;

      const authRedirectURL = window.location.protocol + "//" + window.location.host + redirectURL + "auth";

      const username = "";
      const password = "";

      if(authenticateUser)
        performAuth(authType, code, authRedirectURL + "?authType=" + authType, username, password);
      else
        registerData(authType, token);
	  
	  router.replace(redirectURL);
   }

 }

 render() {
   return <Fetching />;
 }

}

const WrapperAuth = withRouter(AuthDialog, { withRef: true })

export default WrapperAuth;