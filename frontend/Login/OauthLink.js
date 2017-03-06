import React from 'react';


const OauthLink = ({provider, clientId, serviceAuthURL, authParams, redirectTo, linkButton}) => {

 const authUrl = serviceAuthURL + clientId + authParams + redirectTo + "authType=" + provider.toLowerCase() + "&";

 return ( 
 <a href={authUrl}>
   {linkButton}
 </a>
 );

}

export default OauthLink;
