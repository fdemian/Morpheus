import tornado
import tornado.web
import tornado.auth
import json


class RegisterInfo(tornado.web.RequestHandler, tornado.auth.FacebookGraphMixin):

    @tornado.gen.coroutine
    def get(self, auth_type, token):

        required_fields = "id,name,email,picture,link"
        params = {'scope':'email'}
        fb_user = yield self.facebook_request("/me", access_token=token,extra_params=params, fields=required_fields)        

        respdata = {
            'user': {
                 'name': fb_user['name'],
                 'email': fb_user['email'],
                 'username': fb_user['name']
            },
            'authType': auth_type,
            'token': token
        }

        data = {'data': respdata}
        response = json.dumps(data)
        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
