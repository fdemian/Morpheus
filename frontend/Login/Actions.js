import signIn from '../AuthHelper/Actions';
import sendContent from '../store/callApiHelpers';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export default function login(username, password) {

   const _type = "database"

   return (dispatch, getState) => {

      const endpoint = "auth";

  	  const jsonData = JSON.stringify({
         code: "",
         type: _type,
         redirect: "",
         username: username,
         password: password
      });

      const types = [AUTH_START, AUTH_SUCCESS, AUTH_FAILURE];
      dispatch(sendContent(endpoint, types, jsonData));
   }

}

