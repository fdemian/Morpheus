export const REQUEST_CONFIG_DATA = 'REQUEST_CONFIG_DATA';
export const RECEIVE_CONFIG_DATA = 'RECEIVE_CONFIG_DATA';
export const RECEIVE_CONFIG_FAILURE = 'RECEIVE_CONFIG_FAILURE';

export const INITIALIZE_WEBSOCKET = 'INITIALIZE_WEBSOCKET';
export const INITIALIZE_WEBSOCKET_SUCESS = 'INITIALIZE_WEBSOCKET_SUCESS';
export const INITIALIZE_WEBSOCKET_FAILURE = 'INITIALIZE_WEBSOCKET_FAILURE';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export default function loadConfig() {

  const _endpoint = "config";

  return {
    types: [REQUEST_CONFIG_DATA, RECEIVE_CONFIG_DATA, RECEIVE_CONFIG_FAILURE],
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders: { mode: 'cors', cache: 'default' },
    payload: null
  }
}

export function initializeNotifications() {
  return {
    types: [INITIALIZE_WEBSOCKET, INITIALIZE_WEBSOCKET_SUCESS, INITIALIZE_WEBSOCKET_FAILURE, NEW_NOTIFICATION],
    middlewareType: "websocket",
  }
}