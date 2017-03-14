import jwt
import json
from datetime import datetime, timedelta
from backend.authentication.OAuthService import OAuthService
from backend.authentication.Database import DatabaseAuthService
from backend.authentication.AuthExceptions import OAuthFailedException, NoSuchServiceException, InvalidUserException
from backend.Utils import get_oauth_settings
from tornado.web import RequestHandler
from tornado.gen import coroutine


# Decode a JWT token and return the results.
def validate_token(jwt_token, secret, algorithm):
    try:
        if jwt_token is None:
            return None

        payload = jwt.decode(jwt_token, secret, algorithms=[algorithm])

        return payload

    except (jwt.DecodeError, jwt.ExpiredSignatureError):
        return None


class AuthenticatedHandler(RequestHandler):

    def get_current_user(self):
        auth_headers = self.request.headers.get("Authorization")

        jwt_token = auth_headers.split(" ")[1]
        jwt_secret = self.settings["jwt_secret"]
        jwt_algorhitm = self.settings["jwt_algorithm"]
        validated_user = validate_token(jwt_token, jwt_secret, jwt_algorhitm)

        if validated_user is None:
            return None

        # Perform additional validation on JWT claims.
        decoded_id = int(self.get_secure_cookie("user", value=validated_user["user_token"]))

        if decoded_id is None:
            return None

        return decoded_id


class BaseAuth(RequestHandler):

    @coroutine
    def post(self):

        try:
            request = self.request.body.decode("utf-8")
            json_request = json.loads(request)

            auth_code = json_request["code"]
            auth_type = json_request["type"]
            redirect_url = json_request["redirectURL"]

            username = json_request["username"]
            password = json_request["password"]

            if auth_type == "database":
                authentication = DatabaseAuthService()
                user = authentication.authenticate_user(username, password)
            else:
                oauth_settings = get_oauth_settings(self.settings)
                authentication = OAuthService(oauth_settings)
                user = yield authentication.get_user_by_service(auth_type, auth_code, redirect_url)

            jwt_token = self.perform_authentication(user, auth_type, '3600')
            data = {'data': {'token': jwt_token.decode('utf-8')}}
            response = json.dumps(data)

            self.set_status(200, 'Ok')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return user

        except OAuthFailedException:
            response = {'message': "An error ocurred authenticating the user."}
            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

        except NoSuchServiceException:
            response = {'message': "The specified oauth service does not exist or is not enabled."}
            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

        except InvalidUserException:
            response = {'message': "The user/password combination is invalid."}
            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

    def perform_authentication(self, user, auth_type, expires):

        user_id = str(user["id"])
        user_token = self.create_signed_value("user", user_id).decode('utf-8')
        jwt_expiration = self.settings["jwt_expiration_seconds"]
        expdate = datetime.utcnow() + timedelta(int(jwt_expiration))

        jwt_payload = {
            'user': user,
            'user_token': user_token,
            'type': auth_type,
            'exp': expdate
        }

        jwt_token = jwt.encode(jwt_payload, self.settings["jwt_secret"], algorithm=self.settings["jwt_algorithm"])

        return jwt_token


class LogoutHandler(AuthenticatedHandler):

    @coroutine
    def post(self):

        if not self.get_current_user():
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return

        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write({'status': 'ok'})

        return
