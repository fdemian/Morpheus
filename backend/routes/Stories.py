import json
from backend.model.sessionHelper import get_session
from backend.model.models import Story, User, Category
from sqlalchemy.orm.exc import NoResultFound
from backend.authentication.AuthenticatedHandler import AuthenticatedHandler
from tornado.web import RequestHandler
from tornado.gen import coroutine


class StoriesHandler(AuthenticatedHandler):

    # GET /stories
    @coroutine
    def get(self):

        session_object = get_session()
        session = session_object()
        all_stories = session.query(Story).order_by(Story.id.desc()).all()
        data = []

        for story in all_stories:

            if story.category is None:
                category = {'id': -1, 'name': "Uncategorized"}
            else:
                category = {'id': story.category.id, 'name': story.category.name}

            json_story = {
                 'id': story.id,
                 'name': story.title,
                 'content': story.content,
                 'tags': story.tags,
                 'author': {
                    'id': story.user.id,
                    'name': story.user.username,
                    'avatar':  story.user.avatar
                 },
                 'replies': 0,
                 'views': 0,
                 'category': category
            }

            data.append(json_story)

        response = {'data': data}
        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return

    # POST /stories/new
    def post(self):
        request = self.request.body.decode("utf-8")
        jsonrequest = json.loads(request)

        if not self.get_current_user():
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return

        title = jsonrequest["title"]
        tags = jsonrequest["tags"]
        content = jsonrequest["content"]
        author_id = jsonrequest["author"]
        category_id = jsonrequest["category"]

        session_object = get_session()
        session = session_object()

        try:
            category = session.query(Category).filter(Category.id == category_id).one()
        except NoResultFound:
            category = None

        story_id = self.save_story(session, content, title, author_id, category, tags)

        response = {'data': {'saved': 'yes', 'id': str(story_id)}}
        json.dumps(response)
        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

    @coroutine
    def put(self):
        response = {"message": "This is not a valid method for this resource."}
        self.set_status(405, 'Error')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps(response))

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

    @staticmethod
    def save_story(session, content, title, author_id, category, tags):

        user = session.query(User).filter(User.id == author_id).one()

        story = Story()
        story.title = title
        story.content = content
        story.category = category
        story.user_id = author_id
        story.tags = tags

        user.stories.append(story)
        session.commit()

        return story.id


# TODO: integrate into stories handler.
class StoriesByUserHandler(RequestHandler):

    # GET /user/stories
    def get(self, user_id):

        session_object = get_session()
        session = session_object()

        data = []

        # TODO: esto no siempre es verdadero.
        # Asumimos que el usuario siempre existe.
        user = session.query(User).filter(User.id == user_id).one()
        all_stories = user.stories

        for story in all_stories:

            if story.category is None:
                category = {'id': -1, 'name': "Uncategorized"}
            else:
                category = {'id': story.category.id, 'name': story.category.name}

            json_story = {
                 'id': story.id,
                 'name': story.title,
                 'author': {
                    'id': user.id,
                    'name': user.username,
                    'avatar': user.avatar
                 },
                 'replies': 0,
                 'views': 0,
                 'category': category
            }

            data.append(json_story)

        response = {'data': data}
        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
