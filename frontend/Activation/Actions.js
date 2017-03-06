import sendContent from '../store/callApiHelpers';

export const REQUEST_USER_ACTIVATION = 'REQUEST_USER_ACTIVATION';
export const USER_ACTIVATION_SUCCESS = 'USER_ACTIVATION_SUCCESS';
export const USER_ACTIVATION_FAILURE = 'USER_ACTIVATION_FAILURE';

export default function activateUser(code) {
    return (dispatch, getState) => {

  	  const state = getState();

      const _endpoint = "activation";
      const jsonData = JSON.stringify({code: code });
      const types =  [REQUEST_USER_ACTIVATION, USER_ACTIVATION_SUCCESS, USER_ACTIVATION_FAILURE];

      dispatch(sendContent(_endpoint, types, jsonData));
    }
}