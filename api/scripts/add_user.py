from getpass import getpass
from api.model.sessionHelper import get_session
from api.Utils import do_save_user


def add_user():

    username = input("Choose a username: ")
    password = getpass("Choose a password: ")
    email = input("Enter a valid email address: ")
    name = input("Choose a user name: ")
    print(password)

    user = {
        'username': username,
        'password': password,
        'email': email,
        'name': name,
        'type': 'database'
    }

    session_object = get_session()
    session = session_object()
    do_save_user(user, session)
