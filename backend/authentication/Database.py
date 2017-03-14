from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound
from backend.model.sessionHelper import get_session
from backend.model.models import User, UserActivation
from backend.authentication.AuthExceptions import InvalidUserException
from backend.Crypto import hash_password, check_password


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

        # TODO: document this.
        user = User()
        user.username = user_to_save["username"]
        user.password = hash_password(user_to_save["password"])
        user.fullname = user_to_save["name"]
        user.email = user_to_save['email']
        user.valid = False  # A user is not valid until his/her email has ben verified.
        user.avatar = "_default_avatar.png"

        # Save user.
        session_object = get_session()
        session = session_object()
        session.add(user)
        session.commit()

        # Save activation info.
        user_activation = UserActivation()
        user_activation.code = activation_code
        user_activation.user_id = user.id
        session.add(user_activation)
        session.commit()

        return user

    @staticmethod
    def get_mock_user():
        mock_user = User()
        mock_user.username = ""
        mock_user.password = "fake_password"
        return mock_user

