from tornado import gen
from .FacebookService import FacebookAuthService
from .GoogleService import GoogleAuthService
from backend.authentication.AuthExceptions import OAuthFailedException, NoSuchServiceException
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from backend.model.sessionHelper import get_session
from backend.model.models import User, OAuthAccount
from backend.authentication.AuthExceptions import ExistingUserException
from backend.Utils import download_avatar, uglify_username


class OAuthService:

    services = {
        "facebook": FacebookAuthService,
        "google": GoogleAuthService
    }

    def __init__(self, application, request):
        self.application = application
        self.request = request

    @gen.coroutine
    def get_user_by_service(self, service_type, auth_code, redirect_uri):

        auth_service = self.services.get(service_type)

        if auth_service is None:
            raise NoSuchServiceException

        service_instance = auth_service(application=self.application, request=self.request)
        user = yield service_instance.get(auth_code, redirect_uri, "login")

        if user is None:
            raise OAuthFailedException

        return user

    def register_user(self, service_type, auth_code, redirect_uri):

        auth_service = self.services.get(service_type)

        if auth_service is None:
            raise NoSuchServiceException

        service_instance = auth_service(application=self.application, request=self.request)
        oauth_user = yield service_instance.get(auth_code, redirect_uri, "register")
        user_avatar = yield download_avatar(oauth_user["avatar"], uglify_username(oauth_user["name"]))

        user = User()
        user.username = oauth_user["username"]
        user.fullname = oauth_user["name"]
        user.email = oauth_user['email']
        user.valid = True  # Identity verified by the oauth provider.
        user.password = None
        user.salt = None
        user.avatar = user_avatar

        oauth_account = OAuthAccount()
        oauth_account.oauth_id = oauth_user["id"]
        oauth_account.provider = service_type

        user.accounts.add(oauth_account)

        saved_user = self.save_user(user)

        return saved_user        

    @staticmethod
    def save_user(user):

        # Save user.
        session_object = get_session()
        session = session_object()

        try:
            user_exists = session.query(User).filter(User.email == user.email).one_or_none()

            if user_exists is not None:
                raise ExistingUserException

            session.add(user)
            session.commit()

            return user

        except (MultipleResultsFound, ExistingUserException):
            return None
