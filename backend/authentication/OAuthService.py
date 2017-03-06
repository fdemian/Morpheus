from tornado import gen
from .FacebookService import FacebookAuthService
from .GoogleService import GoogleAuthService
from backend.authentication.AuthExceptions import OAuthFailedException, NoSuchServiceException


class OAuthService:

    services = {
        "facebook": FacebookAuthService,
        "google": GoogleAuthService
        # "github": GithubAuthService
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
        user = yield service_instance.get(auth_code, redirect_uri)

        if user is None:
            raise OAuthFailedException

        return user
