import json
from backend.model.sessionHelper import get_session
from backend.model.models import Notification
from .Auth import AuthenticatedHandler
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound


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

        alerts = session.query(Notification).filter(Notification.user_id == current_user, Notification.read == False)\
                                                   .order_by(Notification.id.desc())\
                                                   .all()

        data = []

        for notification in alerts:
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

    # PUT /alerts
    def put(self):

        current_user = self.get_current_user()

        if not current_user:
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        request = self.request.body.decode("utf-8")
        json_request = json.loads(request)

        session_object = get_session()
        session = session_object()

        try:

            notification_id = json_request["id"]
            notification = session.query(Notification).filter(Notification.id == notification_id).one()

            # Modify all the fields.
            notification.type = json_request["type"]
            notification.text = json_request["text"]
            notification.link = json_request["link"]
            notification.read = json_request["read"]

            session.commit()

            status = 200
            status_str = 'Ok'
            response = {'data': {'id': notification_id}}

        except NoResultFound:
            status = 500
            status_str = "error"
            response = {'data': ''}

        except MultipleResultsFound:
            status = 500
            status_str = "error"
            response = {'data': ''}

        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_status(status, status_str)
        self.write(response)

        return
