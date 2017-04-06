from backend.model.sessionHelper import get_session
from backend.model.models import Notification
from .Auth import AuthenticatedHandler


class Alerts(AuthenticatedHandler):

    # GET /story/id
    def get(self):

        current_user = self.get_current_user()

        if not current_user:
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

        # Perform additional validation on JWT claims.
        user_id = int(self.get_secure_cookie("user", value=current_user["user_token"]))

        session_object = get_session()
        session = session_object()

        # Only return notifications the user has currently read.
        notifications = session.query(Notification).filter(Notification.user_id == user_id and not Notification.read) \
            .order_by(Notification.id.desc()) \
            .all()

        data = []

        for notification in notifications:
            json_notification = {
                'id': notification.id,
                'type': notification.type,
                'text': notification.text,
                'link': notification.link,
                'read': notification.read
            }

            data.append(json_notification)

        response = {'data': data}
        self.set_status(200, 'Ok ')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
