import json
from api.model.sessionHelper import get_session
from api.model.models import User, UserActivation
from tornado.web import RequestHandler
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from tornado.gen import coroutine


class UserActivationHandler(RequestHandler):

    @coroutine
    def get(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

        return

    def post(self):

        request = self.request.body.decode("utf-8")
        request_dict = json.loads(request)
        code = request_dict["code"]

        try:
            session_object = get_session()
            session = session_object()

            user_activation = session.query(UserActivation).filter(UserActivation.code == code).one()
            user_to_validate = session.query(User).filter(User.id == user_activation.user_id).one()
            user_to_validate.valid = True
            session.commit()
            session.flush()

            session.delete(user_activation)
            session.commit()

            response = {"message": "Account confirmed successfully."}

            self.set_status(200, 'Ok')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(json.dumps(response))

        except (NoResultFound, MultipleResultsFound):

            response = {"message": "Error: the activation code introduced was invalid."}

            self.set_status(400, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(json.dumps(response))

        return

    @coroutine
    def put(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def delete(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def trace(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def connect(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def options(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def patch(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return

    @coroutine
    def head(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

        return
