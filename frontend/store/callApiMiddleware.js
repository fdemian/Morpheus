import 'isomorphic-fetch';

function PerformFetch(types, endpoint, headers, dispatch)
{

   let action = {};
   const [ requestType, successType, failureType ] = types
   dispatch({type: requestType });

   return fetch(endpoint, headers).then(
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
   );
}

function callAPIMiddleware({ dispatch, getState }) {

  return next => action => {

    const { types, endpoint, headers } = action;

    if (!types)
        return next(action);

    if(types.length === 7)
        return next(action);

    if(!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string'))
        throw new Error('Expected an array of three string types.');

	// Types for this request.
    PerformFetch(types, endpoint, headers, dispatch);

  }

}

export default callAPIMiddleware;
