const WS_URL = "ws://" + window.location.host + "/api/notifications";

function webSocketMiddleware({ dispatch, getState }) {

  return next => action => {

    const { types, middlewareType } = action

    if(types === undefined || middlewareType === undefined || types.length === 3)
        return next(action);

    if(!Array.isArray(types) || types.length !== 4 || !types.every(type => typeof type === 'string'))
        throw new Error('Expected an array of four string types.')

    if(middlewareType != "websocket"){
       next(action);
    }

    const [ initType, successType, errorType, notificationType ] = types
    dispatch({type: initType })
    const webSocket = new WebSocket(WS_URL);
    webSocket.onerror =  function(event){ onWsError(dispatch, errorType) };
    webSocket.onopen =  function(event){ onWsOpen(dispatch, successType) };
    webSocket.onmessage = function(event){ onWsMessage(event, dispatch, notificationType); } ;

    window.webSocket = webSocket;

    return;
  }
}

export function onWsError (dispatch, errorType) {
    dispatch({type: errorType});
}

export function onWsOpen(dispatch, sucessType){
   dispatch({type: sucessType});
}

export function onWsMessage(event, dispatch, notificationType){
   var notification = JSON.parse(event.data);
   dispatch({type: notificationType, data: notification });
}

export default webSocketMiddleware;