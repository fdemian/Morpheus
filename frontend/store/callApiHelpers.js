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

export function sendContentAuth(_endpoint, _types, content, jwtToken) {

  const _headers = {
      method: 'post',
      mode: 'cors',
      cache: 'default',
      headers: {
         'Authorization': 'Bearer ' + jwtToken,
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: content
  };

  return {
    types: _types,
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders: _headers,
    payload: null
  }
}

export function deleteResource(_endpoint, _types, jwtToken) {

  const _headers = {
      method: 'delete',
      mode: 'cors',
      cache: 'default',
      headers: {
         'Authorization': 'Bearer ' + jwtToken,
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "{}"
  };

  return {
    types: _types,
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
