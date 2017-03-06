import json
from backend.model.sessionHelper import get_session
from backend.model.models import User, PasswordChange
from tornado.web import RequestHandler
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from backend.Crypto import hash_password, check_password


def is_token_expired():
    pass

"""
class PasswordResetHandler(RequestHandler):

    def post(self):

        request = self.request.body.decode("utf-8")
        request_dict = json.loads(request)
        code = request_dict["code"]

        hashed_code = hash_password(code)

        try:
            session_object = get_session()
            session = session_object()

            reset_request = session.query(PasswordChange).filter(PasswordChange.token == hashed_code).one()

            if not is_token_expired(reset_request.time):


            # user_to_validate = session.query(User).filter(User.id == user_activation.user_id).one()

            #session.delete(user_activation)
            session.commit()

            response = {"message": "Password reset successfully."}

            self.set_status(200, 'Ok')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(json.dumps(response))

        except (NoResultFound, MultipleResultsFound):

            response = {"message": "Error: the password reset code introduced was invalid or it expired."}

            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(json.dumps(response))
"""