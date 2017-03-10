export default function sendContent(_endpoint, _types, content) {

  const headers = {method: 'post', mode: 'cors', cache: 'default', body: content};

  return {
    types: _types,
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders: headers,
    payload: null
  }
}

export function _POST(endpoint, types, content, jwtToken)
{
   return authenticatedRequest(endpoint, types, content, jwtToken, "post");
}

export function _PUT(endpoint, types, content, jwtToken)
{
   return authenticatedRequest(endpoint, types, content, jwtToken, "put");
}

export function _DELETE(endpoint, types, jwtToken)
{
   return authenticatedRequest(endpoint, types, "{}", jwtToken, "delete");
}

function authenticatedRequest(_endpoint, types, content, jwtToken, method)
{
  const _headers = {
      method: method,
      mode: 'cors',
      cache: 'default',
      headers: {
         'Authorization': 'Bearer ' + jwtToken,
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: content
  };

  return {
    types: types,
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders: _headers,
    payload: null
  }
}


// Authentication is required to perform this action.
export function authenticationRequired() {
  return {
    type: AUTHENTICATION_REQUIRED
  }
}
