from tornado.gen import coroutine
from tornado.httpclient import AsyncHTTPClient
from os import path, getcwd


@coroutine
def fetch_coroutine(url):
    http_client = AsyncHTTPClient()
    response = yield http_client.fetch(url)
    # In Python versions prior to 3.3, returning a value from
    # a generator is not allowed and you must use
    #   raise gen.Return(response.body)
    # instead.
    return response.body


# TODO is the extension always jpg?
@coroutine
def download_avatar(url, username):
    data = yield fetch_coroutine(url)

    current_dir = getcwd()
    output_file_name = path.join(current_dir, "static/avatars/") + username + ".jpg"
    save_file(output_file_name, data)

    return output_file_name


def save_file(path, data):
    with open(path, "bw") as f:
        f.write(data)
