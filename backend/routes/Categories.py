import json
from backend.model.sessionHelper import get_session
from backend.model.models import Category, Story
from backend.authentication.AuthenticatedHandler import AuthenticatedHandler
from tornado.web import RequestHandler
from tornado.gen import coroutine
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound


class CategoryHandler(AuthenticatedHandler):

    def get(self, category_id):

        session_object = get_session()
        session = session_object()
        category = session.query(Category).filter(Category.id == category_id).one()

        response = {
            'data': {
              'id': category.id,
              'name': category.name
            }
        }

        json.dumps(response)
        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

    @coroutine
    def delete(self, category_id):

        if not self.get_current_user():
            response = {'Error': "Token is invalid."}
            self.set_status(403, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        try:

            session_object = get_session()
            session = session_object()
            category = session.query(Category).filter(Category.id == category_id).one()
            session.delete(category)
            session.commit()

            response = {'data': {'id': category_id}}
            self.set_status(200, 'Ok')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        except (NoResultFound, MultipleResultsFound):
            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")

            return


class CategoryTopicsHandler(RequestHandler):

    def get(self, category_id, page):

        session_object = get_session()
        session = session_object()
        category_stories = session.query(Story).filter(Story.category_id == category_id).all()
        data = []

        for story in category_stories:
            json_item = {
                'id': story.id,
                'name': story.title,
                'author': {
                    'id': story.user.id,
                    'name': story.user.username,
                    'avatar': story.user.avatar
                }
            }

            data.append(json_item)

        response = {
            'data': {
                'currentPage': int(1),
                'totalPages': int(1),
                'items': data
            }
        }

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class CategoriesHandler(AuthenticatedHandler):

    # GET /categories
    @coroutine
    def get(self):

        session_object = get_session()
        session = session_object()
        all_categories = session.query(Category).all()

        data = []

        for category in all_categories:
            json_category = {
                 'id': category.id,
                 'name': category.name,
            }

            data.append(json_category)

        response = {'data': data}
        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

    # POST /categories
    def post(self):

        request = json.loads(self.request.body.decode("utf-8"))
        name = request["name"]

        if not self.get_current_user():
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

        category = Category()
        category.name = name

        session_object = get_session()
        session = session_object()
        session.add(category)
        session.commit()

        response = {'data': {'id': category.id, 'name': category.name}}

        json.dumps(response)

        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.write(response)

        return
