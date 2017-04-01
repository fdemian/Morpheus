from tornado.websocket import WebSocketHandler
from backend.routes.Auth import AuthenticatedHandler


class Notifications(WebSocketHandler, AuthenticatedHandler):

    def initialize(self, notifications_handler):
        self.notifications_handler = notifications_handler

    def open(self):
        if len(self.notifications_handler) == 0:
            self.notifications_handler.append(self)
        else:
            self.notifications_handler[0] = self

    # Notifications for a given user were requested.
    def on_message(self, message):

        current_user_id = self.get_current_user()

        print(self.get_current_user)
        print(current_user_id)
        print("(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)")

        if not current_user_id:
            self.write_message("{}")
        else:
            print(current_user_id)
            self.write_message("{'madea': 'boo!'}")

    # TODO: Print a message?
    def on_close(self):
        print("Closing websocket")
