import fetch from 'isomorphic-fetch';
import sendContent from '../store/callApiHelpers';
import { _POST} from '../store/callApiHelpers';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export default function signIn(type, token, redirectURI, username, password)
{
    return (dispatch, getState) => {

      const endpoint = "auth";

  	  const jsonData = JSON.stringify({
         code: token,
         type: type,
         redirect: redirectURI,
         username: username,
         password: password
      });

      const types = [AUTH_START, AUTH_SUCCESS, AUTH_FAILURE];

      dispatch(sendContent(endpoint, types, jsonData));

    }
}

export function signOut() {
  return (dispatch, getState) => {
	const state = getState();
    const type = state.session.authType;
    const token = state.session.token;
    const _endpoint = "auth/logout/";
    const types = [LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE];

    dispatch(_POST(_endpoint, types, "{}", token));
  }
}