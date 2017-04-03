import jwt
import re
from tornado.gen import coroutine
from tornado.httpclient import AsyncHTTPClient
from os import path, getcwd

# Decode a JWT token and return the results.
def validate_token(jwt_token, secret, algorithm):
    try:
        if jwt_token is None:
            return None

        payload = jwt.decode(jwt_token, secret, algorithms=[algorithm])

        return payload

    except (jwt.DecodeError, jwt.ExpiredSignatureError):
        return None

@coroutine
def fetch_coroutine(url):
    http_client = AsyncHTTPClient()
    response = yield http_client.fetch(url)

    return response.body


# TODO is the extension always jpg?
@coroutine
def download_avatar(url, username):
    data = yield fetch_coroutine(url)

    current_dir = getcwd()
    output_file_name = path.join(current_dir, "static/avatars/") + username + ".jpg"
    save_file(output_file_name, data)

    return username + ".jpg"


def save_file(path, data):
    with open(path, "bw") as f:
        f.write(data)


def uglify_username(username):

    # Remove all non-word characters (everything except numbers and letters)
    username = re.sub(r"[^\w\s]", '', username)

    # Replace all runs of whitespace with a single dash
    username = re.sub(r"\s+", '-', username)

    return username


def get_oauth_settings(settings):

    settings = {
        "facebook":  {
            "key": settings["facebook_api_key"],
            "secret":  settings["facebook_api_secret"]
        },
        "google": {
            "key": settings["google_oauth_key"],
            "secret": settings["google_oauth_secret"]
        }
    }

    return settings
