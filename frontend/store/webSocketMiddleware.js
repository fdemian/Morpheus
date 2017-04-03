const WS_URL = "ws://" + window.location.host + "/api/notifications";

function webSocketMiddleware({ dispatch, getState }) {

  return next => action => {

    const { types, middlewareType } = action

    if(types === undefined || middlewareType === undefined || types.length === 3)
        return next(action);

    if(!Array.isArray(types) || types.length !== 7 || !types.every(type => typeof type === 'string'))
        throw new Error('Expected an array of seven string types.')

    if(middlewareType != "websocket"){ next(action); }

    const [
       initType,
       successType,
       errorType,
       notificationType,
       requestNotificationsType,
       receiveNotificationsType,
       requestNotificationsErrorType,
    ] = types

    const state = getState();
    const token = state.session.token;
    const isLoggedIn = state.session.loggedIn;

    // Do not initialize notifications if the user hasn't successfully logged in.
    if(!isLoggedIn)
       return;

    const requestTypes = {
       request: requestNotificationsType,
       success: receiveNotificationsType,
       error: requestNotificationsErrorType
    };

    dispatch({type: initType })
    const webSocket = new WebSocket(WS_URL);
    webSocket.onerror =  function(event){ onWsError(dispatch, errorType) };
    webSocket.onopen =  function(event){
        onWsOpen(dispatch, successType, requestTypes, token);
    };
    webSocket.onmessage = function(event){ onWsMessage(event, dispatch, notificationType); } ;

    window.webSocket = webSocket;

    return;
  }
}

export function onWsError (dispatch, errorType) {
    dispatch({type: errorType});
}

export function onWsOpen(dispatch, sucessType, requestTypes, token){
   dispatch({type: sucessType});
   getNotifications(dispatch, requestTypes, token);
}

export function onWsMessage(event, dispatch, notificationType){
   var notifications = JSON.parse(event.data);
   console.log(notifications);
   console.log("MADEA!");

   dispatch({type: notificationType, data: notifications.data });
}


export function getNotifications(dispatch, requestTypes, token) {

    dispatch({type: requestTypes.request});
    webSocket = window.webSocket;

    const requestJSON = JSON.stringify({token: token});

    try {
      webSocket.send(requestJSON);
      dispatch({type: requestTypes.success});
    }
    catch(exception) {
       dispatch({type: requestTypes.error});
    }
}


export default webSocketMiddleware;