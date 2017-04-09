from backend.model.sessionHelper import get_session
from backend.model.models import Notification
from .Auth import AuthenticatedHandler


class AlertsHandler(AuthenticatedHandler):

    # GET /alerts
    def get(self):

        current_user = self.get_current_user()

        if not current_user:
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        if not self.settings['notifications_enabled']:
            response = {'Error': "Notifications disabled."}
            self.set_status(501, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        session_object = get_session()
        session = session_object()

        print(current_user)

        notifications = session.query(Notification).filter(Notification.user_id == current_user)\
                                                   .order_by(Notification.id.desc())\
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

        return
