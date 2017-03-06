import tornado
import tornado.web
from tornado.auth import GoogleOAuth2Mixin
from tornado.web import RequestHandler
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from backend.model.sessionHelper import get_session
from backend.model.models import User


class GoogleAuthService(RequestHandler, GoogleOAuth2Mixin):

    @tornado.gen.coroutine
    def get(self, auth_code, redirect_url):

        openid_configuration = yield self.oauth2_request(self.settings["google_discovery_url"])
        user_info_endpoint = openid_configuration["userinfo_endpoint"]
        token_endpoint = openid_configuration["token_endpoint"]

        # request_token_url = google_api_url + "token"

        access = yield self.oauth2_request(token_endpoint, post_args={
                                                   "client_id": self.settings["google_oauth_key"],
                                                   "client_secret": self.settings["google_oauth_secret"],
                                                   "grant_type": "authorization_code",
                                                   "redirect_uri": redirect_url,
                                                   "code": auth_code
                                               }
                                           )

        token = access["access_token"]
        # expires_in = access["expires_in"]

        google_user = yield self.oauth2_request(user_info_endpoint, access_token=token)

        if not google_user:
            return None

        user = self.get_user(google_user)

        return user

    @staticmethod
    def get_user(google_user):

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

