from tornado.websocket import WebSocketHandler


class Notifications(WebSocketHandler):

    def initialize(self):
        print("Initializing websocket")

    def open(self):
        self.settings['notifications_handler'] = self

    # Notifications for a given user were requested.
    def on_message(self, message):
        print(message)

    def on_close(self):
        print("Closing websocket")
