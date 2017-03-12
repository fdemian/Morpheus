import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import OAuthButton from './OAuthButton';

const OAuthButtons = ({providers, isLogin}) => {

  let urlParams;

  if(isLogin)
    urlParams = "/auth?method=login";
  else
    urlParams = "/auth?method=register";

  const redirectURL = window.location.protocol + "//" + window.location.host + urlParams;

  return (
    <div>
     {providers.map((provider, i) => <OAuthButton key={i} provider={provider} redirectURL={redirectURL} /> )}
    </div>
  );

}

export default OAuthButtons;