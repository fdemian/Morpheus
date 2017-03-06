import json
import uuid

from tornado.web import RequestHandler

from backend.mail.ConcreteMailSender import ConcreteMailSender
from backend.SendEmail import send_confirmation_email
from backend.authentication.Database import DatabaseAuthService
from backend.authentication.OAuthService import OAuthService
from backend.model.models import User
from backend.model.sessionHelper import get_session


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

        response = {'data': {'user': user_json}}
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

        response = {'data': data}
        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

    # POST /users/
    def post(self):

        # TODO: validate user information (through forms library?)
        request = self.request.body.decode("utf-8")
        json_request = json.loads(request)
        authentication = DatabaseAuthService()
        activation_code = str(uuid.uuid4())
        register_type = request["type"]

        if register_type == "database":
            user_to_validate = authentication.save_user(json_request, activation_code)
        else:
            auth_code = request["code"]
            redirect_uri = request["redirectURI"]
            authentication = OAuthService(application=self.application, request=self.request)
            user_to_validate = yield authentication.get_user_by_service(register_type, auth_code, redirect_uri)

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

        response = {"message": "We sent you an email to verify your account."}

        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        if register_type == "database":
            send_confirmation_email(mail_info, mailer)

        return
