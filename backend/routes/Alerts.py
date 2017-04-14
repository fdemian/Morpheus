import json
from backend.model.sessionHelper import get_session
from backend.model.models import Notification
from backend.authentication.AuthenticatedHandler import AuthenticatedHandler
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from tornado.gen import coroutine
from backend.Utils import authenticated

class AlertsHandler(AuthenticatedHandler):

    # GET /alerts
    @authenticated
    def get(self):

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
    @authenticated
    def put(self):

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

    @coroutine
    def delete(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def trace(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def connect(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def options(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def patch(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    @coroutine
    def head(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return
