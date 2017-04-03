import json
from backend.Utils import validate_token
from backend.model.sessionHelper import get_session
from backend.model.models import Notification
from tornado.websocket import WebSocketHandler

class Notifications(WebSocketHandler):

    def initialize(self, notifications_handler):
        self.notifications_handler = notifications_handler

    def open(self):
        if len(self.notifications_handler) == 0:
            self.notifications_handler.append(self)
        else:
            self.notifications_handler[0] = self

    # Notifications for a given user were requested.
    def on_message(self, message):

        json_message = json.loads(message)
        jwt_token = json_message["token"]
        jwt_secret = self.settings["jwt_secret"]
        jwt_algorhitm = self.settings["jwt_algorithm"]

        validated_user = validate_token(jwt_token, jwt_secret, jwt_algorhitm)

        if validated_user is None:
            self.write_message("{}")

        # Perform additional validation on JWT claims.
        user_id = int(self.get_secure_cookie("user", value=validated_user["user_token"]))
        session_object = get_session()
        session = session_object()
        notifications = session.query(Notification).filter(Notification.user_id == user_id)\
                                                   .order_by(Notification.id.desc())\
                                                   .all()
        data = []

        for notificaton in notifications:

            json_notification = {
                'id': notificaton.id,
                'type': notificaton.type,
                'text': notificaton.text,
                'link': notificaton.link
            }

            data.append(json_notification)

        response = {'data': data}
        print(response)
        self.write_message(json.dumps(response))


    # TODO: Print a message?
    def on_close(self):
        print("Closing websocket")
