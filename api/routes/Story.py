import json
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from api.model.sessionHelper import get_session
from api.model.models import Story
from api.authentication.AuthenticatedHandler import AuthenticatedHandler
from tornado.gen import coroutine


class StoryHandler(AuthenticatedHandler):

    # GET /story/id
    def get(self, story_id):

        session_object = get_session()
        session = session_object()

        try:
            story = session.query(Story).filter(Story.id == story_id).one()
            content = json.loads(story.content)

            if story.category is None:
                category = {'id': -1, 'name': "uncatalogued"}
            else:
                category = {'id': story.category.id, 'name': story.category.name}

            comments = []
            for comment in story.comments:
                json_comment = {
                     'id': comment.id,
                     'author': comment.author,
                     'content': comment.content,
                     'avatar': comment.avatar,
                     'url': comment.url,
                }

                comments.append(json_comment)

            response = {
                 'id': story.id,
                 'title': story.title,
                 'category': category,
                 'content': content,
                 'comments': comments,
                 'tags': story.tags
            }

            status = 200
            status_str = 'Ok'

        except NoResultFound:
            status = 500
            status_str = "Error"
            response = {'message': 'No stories found for the specified id.'}

        except MultipleResultsFound:
            status = 500
            status_str = "error"
            response = {'message': 'Multiple stories found for the specified id.'}

        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_status(status, status_str)
        self.write(response)

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
