import fetch from 'isomorphic-fetch';
import sendContent from '../store/callApiHelpers';

/* UPDATE FIELDS */
export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const NAME_CHANGED = 'NAME_CHANGED';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

/* FILL REGISTER DATA */
export const REGISTER_FILL_DATA = 'REGISTER_FILL_DATA';
export const REGISTER_FILL_SUCCESS = 'REGISTER_FILL_SUCCESS';
export const REGISTER_FILL_FAILURE = 'REGISTER_FILL_FAILURE';

/* REGISTER USER */
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function updateEmailFn(value)
{
   return (dispatch, getState) => {

    const state = getState();
    let user = state.session.user;
    user.email = value;

    return { type:EMAIL_CHANGED, data: user};
  }
}

export function updateNameFn(value)
{
  return (dispatch, getState) => {
   const state = getState();
   let user = state.session.user;
   user.name = value;
   return { type:NAME_CHANGED, data: user};
 }
}

export function updateUsernameFn(value)
{
  return (dispatch, getState) => {

   const state = getState();
   let user = state.session.user;
   user.username = value;

   return { type:USERNAME_CHANGED, data: user};
 }
}

export function updatePasswordFn(value)
{
   return { type:PASSWORD_CHANGED, data: value};
}

export default function register(_type, code, redirectURL) {
  return (dispatch, getState) => {


	  const endpoint = "users";
      const types = [REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE];

      let jsonData = null;

      if(_type == "database")
      {
      	  const state = getState();
   	      const _username = state.session.user.username;
	      const _password = state.session.password;
	      const _email = state.session.user.email;
	      const _name = state.session.user.name

          jsonData = JSON.stringify({
              username: _username,
              password: _password,
              email: _email,
              name: _name,
              type: _type
          });
      }
      else
         jsonData = JSON.stringify({code: code,type: _type, redirectURL: redirectURL});

      dispatch(sendContent(endpoint, types, jsonData))
  }
}
