import 'isomorphic-fetch'

const API_ROOT = window.location.protocol + "//" + window.location.host + "/api/";

function callAPIMiddleware({ dispatch, getState }) {

  return next => action => {

    const {
        types,
        endpoint,
	    callHeaders,
        shouldCallAPI = () => true,
        payload = {}
    } = action;

    if (!types)
        return next(action);

    if(types.length === 7)
        return next(action);

    if(!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string'))
        throw new Error('Expected an array of three string types.');

    if (!shouldCallAPI(getState()))
        return;
    
	// Types for this request.
    const [ requestType, successType, failureType ] = types
	
	dispatch({type: requestType });
	
    return fetch(API_ROOT + endpoint, callHeaders).then(
	  response => {	
		
		response.json().then(function(json) {			
			if(response.ok)
			  action = { data: json.data, type: successType };
		    else
			  action = {data: json.message, type: failureType};
		  
		    dispatch(action);
        });
		
	  },
      error => dispatch({type: failureType })
	)
  }
}

export default callAPIMiddleware;
