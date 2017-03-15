import tornado
import tornado.web
from tornado.auth import GoogleOAuth2Mixin
from tornado.web import RequestHandler
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from backend.model.sessionHelper import get_session
from backend.model.models import User


class GoogleAuthService(GoogleOAuth2Mixin):

    def __init__(self, key, secret):
        self.key = key
        self.secret = secret

    @tornado.gen.coroutine
    def get(self, auth_code, redirect_url, method):

        discovery_url = "https://accounts.google.com/.well-known/openid-configuration"

        openid_configuration = yield self.oauth2_request(discovery_url)
        user_info_endpoint = openid_configuration["userinfo_endpoint"]
        token_endpoint = openid_configuration["token_endpoint"]

        # Request access token.
        access = yield self.oauth2_request(token_endpoint, post_args={
                                                   "client_id": self.key,
                                                   "client_secret": self.secret,
                                                   "grant_type": "authorization_code",
                                                   "redirect_uri": redirect_url,
                                                   "code": auth_code
                                               }
                                           )

        token = access["access_token"]
        # expires_in = access["expires_in"]

        # Request google user.
        google_user = yield self.oauth2_request(user_info_endpoint, access_token=token)

        if not google_user:
            return None

        if method == "login":
            user = self.get_user_from_db(google_user)
        elif method == "register":
            user = self.get_user_to_save(google_user)

        return user

    @staticmethod
    def get_user_to_save(google_user):

        payload = {
            'id': google_user["sub"],
            'avatar': google_user["picture"],
            'username': google_user["name"],
            'fullname': google_user["name"],
            'email': google_user['email'],
            'role': 'author'
        }

        return payload

    @staticmethod
    def get_user_from_db(google_user):

        try:
            session_object = get_session()
            session = session_object()
            user = session.query(User).filter(User.email == google_user['email']).one()

            user_link = '/users/' + str(user.id) + "/" + user.username

            payload = {
                'id': user.id,
                'avatar': user.avatar,
                'username': user.username,
                'role': 'author',
                'link': user_link
            }

        except MultipleResultsFound:
            payload = None

        except NoResultFound:

            payload = {
                'id': google_user["sub"],
                'avatar': google_user["picture"],
                'username': google_user["name"],
                'role': 'guest',
                'link': google_user["profile"]
            }

        return payload

