import json
import jwt
import uuid
from datetime import datetime, timedelta
from tornado.web import RequestHandler
from api.mail.ConcreteMailSender import ConcreteMailSender
from api.SendEmail import send_confirmation_email
from api.authentication.Database import DatabaseAuthService
from api.authentication.OAuthService import OAuthService
from api.model.models import User
from api.model.sessionHelper import get_session
from api.Utils import get_oauth_settings
from tornado.gen import coroutine


# TODO: integrate GET  in USERSHANDLER.
class UserHandler(RequestHandler):

    # GET /users/id
    def get(self, user_id):

        session_object = get_session()
        session = session_object()
        user = session.query(User).filter(User.id == user_id).one()

        user_json = {
             'id': user.id,
             'name': user.fullname,
             'username': user.username,
             'status': 'moderator',
             'avatar': user.avatar,
             'userCard': ''
        }

        response = {'user': user_json}
        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class UsersHandler(RequestHandler):

    # GET /users
    def get(self):

        session_object = get_session()
        session = session_object()

        all_users = session.query(User).all()
        data = []

        for user in all_users:

            json_user = {
                'id': user.id,
                'name': user.fullname,
                'username': user.username,
                'status': 'moderator',  # TODO: este campo es necesario?
                'avatar': user.avatar,
                'userCard': ''
            }

            data.append(json_user)

        response = {"page": 1, "items": data}

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

    # POST /users/
    @coroutine
    def post(self):

        # TODO: validate user information (through forms library?)
        request = self.request.body.decode("utf-8")
        json_request = json.loads(request)
        register_type = json_request["type"]

        if register_type == "database":
            activation_code = str(uuid.uuid4())
            authentication = DatabaseAuthService()
            user_to_validate = authentication.save_user(json_request, activation_code)
            self.send_email(user_to_validate, activation_code)
            if user_to_validate is not None:
                resp_status = 200
                response = {'validated': False, 'user': None, 'token': None, 'type': 'database'}
            else:
                resp_status = 500
                response = {"message": "An error ocurred."}
        else:
            auth_code = json_request["code"]
            redirect_uri = json_request["redirectURL"]
            oauth_settings = get_oauth_settings(self.settings)
            authentication = OAuthService(oauth_settings)
            registered_user = yield authentication.register_user(register_type, auth_code, redirect_uri)
            if registered_user is not None:
                resp_status = 200
                jwt_token = self.perform_authentication(registered_user, register_type, '3600')
                response = {'validated': True, 'user': registered_user, 'token': jwt_token.decode('utf-8'), 'type': register_type}

            else:
                resp_status = 500
                response = {"message": "An error ocurred registering the user."}

        self.set_status(resp_status, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def put(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def delete(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def trace(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def connect(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def options(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def patch(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def head(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    def send_email(self, user_to_validate, activation_code):

        auth_url = self.request.protocol + "://" + self.request.host + "/activation/"

        mail_info = {
            'username': user_to_validate.username,
            'user_address': user_to_validate.email,
            'from_address': self.settings["from_address"],
            'subject': self.settings["mail_subject"],
            'mail_template': self.settings["mail_template"],
            'activation_code': activation_code,
            'auth_url': auth_url
        }

        mailer = ConcreteMailSender(self.settings["mail_host"], int(self.settings["mail_port"]))
        send_confirmation_email(mail_info, mailer)

    def perform_authentication(self, user, auth_type, expires):

        user_id = str(user["id"])
        user_token = self.create_signed_value("user", user_id).decode('utf-8')
        jwt_expiration = self.settings["jwt_expiration_seconds"]
        expdate = datetime.utcnow() + timedelta(int(jwt_expiration))

        jwt_payload = {
            'user_token': user_token,
            'type': auth_type,
            'exp': expdate
        }

        jwt_token = jwt.encode(jwt_payload, self.settings["jwt_secret"], algorithm=self.settings["jwt_algorithm"])

        return jwt_token
