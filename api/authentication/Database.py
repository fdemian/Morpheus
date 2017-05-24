from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from api.model.sessionHelper import get_session
from api.model.models import User
from api.authentication.AuthExceptions import InvalidUserException
from api.Crypto import hash_password, check_password
from api.Utils import do_save_user, save_activation_info


class DatabaseAuthService:

    def authenticate_user(self, username, password):

        user_exists = True
        password_is_correct = False

        user = self.get_user_if_exists(username)

        if user is None:
            user = self.get_mock_user()
            user_exists = False

        # To avoid timing attacks perform a hashing operation on the (fake) user.
        if not user_exists:
            hash_password(user.password)

        if user_exists and check_password(password, user.password):
            password_is_correct = True

        if password_is_correct and user_exists:
            user_dict = self.user_to_dict(user)

            return user_dict
        else:
            raise InvalidUserException

    @staticmethod
    def user_to_dict(user):

        user_link = '/users/' + str(user.id) + "/" + user.username

        payload = {
            'id': user.id,
            'avatar': user.avatar,
            'username': user.username,
            'role': 'author',
            'link': user_link
        }

        return payload

    @staticmethod
    def get_user_if_exists(username):

        try:
            session_object = get_session()
            session = session_object()
            user = session.query(User).filter(User.username == username).one()

            return user

        except MultipleResultsFound:
            return None

        except NoResultFound:
            return None

    @staticmethod
    def save_user(user_to_save, activation_code):

        session_object = get_session()
        session = session_object()
        user = do_save_user(user_to_save, session)
        save_activation_info(activation_code, user, session)

        return user

    @staticmethod
    def get_mock_user():
        mock_user = User()
        mock_user.username = ""
        mock_user.password = "fake_password"
        return mock_user

