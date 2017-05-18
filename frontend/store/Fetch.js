import 'isomorphic-fetch';

const DEFAULT_API_ROOT = window.location.protocol + "//" + window.location.host;

function BuildHeaders(method, content, isAuth, token)
{
      let fetchHeaders = {};

      if(isAuth)
      {
         fetchHeaders = {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/x-www-form-urlencoded'
         }
      }

      return {
        method: method,
        mode: 'cors',
        cache: 'default',
        body: content,
        headers: fetchHeaders
      };

}

class Fetch
{

   static GET(endpoint, types, token)
   {
      return this.SERVER_REQUEST('GET', types, endpoint, null, token);
   }

   static POST(endpoint, types, content, token)
   {
      return this.SERVER_REQUEST('POST', types, endpoint, content, token);
   }

   static PUT(endpoint, types, content, token)
   {
      return this.SERVER_REQUEST('PUT', types, endpoint, content, token);
   }

   static DELETE(endpoint, types, content, token)
   {
      return this.SERVER_REQUEST('DELETE', types, endpoint, content, token);
   }

   static SERVER_REQUEST(method, types, endpoint, content, token)
   {

     let isAuth = false;

     if(token !== null && token !== undefined)
     {
        isAuth = true;
        token = null;
     }

     const headers = BuildHeaders(method, content, isAuth, token);
     const endpointURL = DEFAULT_API_ROOT + endpoint;

     return {
       types: types,
       endpoint: endpointURL,
       headers: headers,
     }
   }

}

export default Fetch;
