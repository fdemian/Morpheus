from tornado.websocket import WebSocketHandler


class Notifications(WebSocketHandler):

    def initialize(self, notifications_handler):
        self.notifications_handler = notifications_handler

    def open(self):
        if len(self.notifications_handler) == 0:
            self.notifications_handler.append(self)
        else:
            self.notifications_handler[0] = self

    def on_close(self):
        pass
