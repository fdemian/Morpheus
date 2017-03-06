import unittest
from backend.model.models import User
from backend.authentication.Database import DatabaseAuthService
from backend.model.sessionHelper import get_session
from backend.authentication.AuthExceptions import InvalidUserException


class TestDatabaseAuthentication(unittest.TestCase):

    def setUp(self):
        user_to_test = User()
        user_to_test.email = "testing@mail.com"
        user_to_test.fullname = "Test User"
        user_to_test.password = "A password"
        user_to_test.username = "grunt"

        self.user = user_to_test
        self.database_auth = DatabaseAuthService()

    def tearDown(self):

        _session = get_session()
        session = _session()
        user = session.query(User).filter(User.username == self.user.username).one_or_none()

        if user is not None:
            session.delete(user)
            session.commit()

    def test_save_user(self):
        # Save the user in the database.
        self.database_auth.save_user(self.user)

        _session = get_session()
        session = _session()
        user = session.query(User).filter(User.username == self.user.username).one_or_none()

        self.assertIsNotNone(user)

    def test_authenticate_user(self):
        # Save user in the database and authenticate it.
        self.database_auth.save_user(self.user)
        user = self.database_auth.authenticate_user(self.user.username, self.user.password)

        # The authentication method returned a valid user object.
        self.assertIsNotNone(user)

    def test_fake_user(self):
        fake_username = "Not a username"
        fake_password = "fake password"

        with self.assertRaises(InvalidUserException):
            self.database_auth.authenticate_user(fake_username, fake_password)

    def test_invalid_password(self):
        username = "grunt"
        bad_password = "fake password"

        self.database_auth.save_user(self.user)

        with self.assertRaises(InvalidUserException):
            self.database_auth.authenticate_user(username, bad_password)


if __name__ == '__main__':
    unittest.main()