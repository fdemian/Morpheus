import React, { Component } from 'react';

const imageStyles = {
   'width': '36px',
   'height': '36px',
   'marginRight': '10px'
};

function onClick(event, authURL){
    event.preventDefault();
    window.location = authURL;
}

const OAuthButtons = ({provider, redirectURL}) => {

   // Facebook & Google auth params.
   const authParams = '&scope=email&display=page&response_type=code&redirect_uri=';
   const redirectTo = redirectURL + "&state=" + provider.name.toLowerCase();
   const authUrl = provider.authorizeURL + provider.key + authParams + redirectTo + "&";

   const baseURL = "/static/icons/";
   const iconPath = baseURL + provider.iconURL;

   return(
   <span >
    <a href={"/auth/" + provider.name} onClick={(evt) => onClick(evt, authUrl)} >
     <img style={imageStyles} src={iconPath} alt={provider.name} />
    </a>
   </span>
   );
}

export default OAuthButtons;