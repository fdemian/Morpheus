import tornado
import tornado.web
import tornado.auth
from tornado.auth import FacebookGraphMixin
from tornado.web import RequestHandler
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from backend.model.sessionHelper import get_session
from backend.model.models import User


class FacebookAuthService(RequestHandler, FacebookGraphMixin):

    @tornado.gen.coroutine
    def get(self, auth_code, redirect_url, method):

        user_info = yield self.get_authenticated_user(
              redirect_uri=redirect_url,
              client_id=self.settings["facebook_api_key"],
              client_secret=self.settings["facebook_api_secret"],
              code=auth_code)

        access_token = user_info["access_token"]
        # expires_in = user_info["session_expires"][0]

        user_fields = "id,name,email,picture,link"
        params = {'scope': 'email'}
        fb_user = yield self.facebook_request("/me", access_token=access_token, extra_params=params, fields=user_fields)

        if not fb_user:
            return None

        if method == "login":
            user = self.get_user_from_db(fb_user)
        elif method == "register":
            user = self.get_user_to_save(fb_user)

        return user

    @staticmethod
    def get_user_to_save(fb_user):

        if not fb_user['picture']['data']['is_silhouette']:
            picture = fb_user['picture']['data']['url']
        else:
            picture = ""

        payload = {
            'id': fb_user["id"],
            'avatar': picture,
            'username': fb_user["name"],
            'fullname': fb_user["name"],
            'email': fb_user["email"],
            'role': 'author'
        }

        return payload

    @staticmethod
    def get_user_from_db(fb_user):

        try:
            session_object = get_session()
            session = session_object()
            user = session.query(User).filter(User.email == fb_user['email']).one()

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

            if not fb_user['picture']['data']['is_silhouette']:
                picture = fb_user['picture']['data']['url']
            else:
                picture = ""

            payload = {
                'id': fb_user["id"],
                'avatar': picture,
                'username': fb_user["name"],
                'role': 'guest',
                'link': fb_user["link"]
            }

        return payload
