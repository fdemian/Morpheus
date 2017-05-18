import { _GET } from  '../store/callApiHelpers';
import Fetch from '../store/Fetch';

export const REQUEST_CONFIG_DATA = 'REQUEST_CONFIG_DATA';
export const RECEIVE_CONFIG_DATA = 'RECEIVE_CONFIG_DATA';
export const RECEIVE_CONFIG_FAILURE = 'RECEIVE_CONFIG_FAILURE';

export const INITIALIZE_WEBSOCKET = 'INITIALIZE_WEBSOCKET';
export const INITIALIZE_WEBSOCKET_SUCCESS = 'INITIALIZE_WEBSOCKET_SUCCESS';
export const INITIALIZE_WEBSOCKET_FAILURE = 'INITIALIZE_WEBSOCKET_FAILURE';

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS';
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
export const REQUEST_NOTIFICATIONS_FAILURE = 'REQUEST_NOTIFICATIONS_FAILURE';

export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export default function loadConfig() {

 return (dispatch, getState) => {
    dispatch(Fetch.GET('/api/config', [REQUEST_CONFIG_DATA, RECEIVE_CONFIG_DATA, RECEIVE_CONFIG_FAILURE]));
 }

}

export function initializeNotifications() {
  return {
    types:  [
       INITIALIZE_WEBSOCKET,
       INITIALIZE_WEBSOCKET_SUCCESS,
       INITIALIZE_WEBSOCKET_FAILURE,
       NEW_NOTIFICATION,
       REQUEST_NOTIFICATIONS,
       RECEIVE_NOTIFICATIONS,
       REQUEST_NOTIFICATIONS_FAILURE
    ],
    middlewareType: "websocket",
  }
}

export function getNotifications() {

   const endpoint = "alerts";
   const types = [REQUEST_NOTIFICATIONS, RECEIVE_NOTIFICATIONS, REQUEST_NOTIFICATIONS_FAILURE];

   return (dispatch, getState) => {
      const state = getState();
      const token = state.session.token;

      dispatch(_GET(endpoint, types, token));
    }
}