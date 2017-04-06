from tornado.websocket import WebSocketHandler


class Notifications(WebSocketHandler):

    def initialize(self, notifications_handler):
        self.notifications_handler = notifications_handler

    def open(self):
        print("Notifications opening")
        if len(self.notifications_handler) == 0:
            self.notifications_handler.append(self)
        else:
            self.notifications_handler[0] = self

    # Notifications for a given user were requested.
    def on_message(self, message):
        print(message)


    # TODO: Print a message?
    def on_close(self):
        print("Closing websocket")
