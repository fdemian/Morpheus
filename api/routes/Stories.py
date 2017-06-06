import json
from api.model.sessionHelper import get_session
from api.model.models import Story, User, Category
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from api.authentication.AuthenticatedHandler import AuthenticatedHandler
from tornado.web import RequestHandler
from tornado.gen import coroutine
from api.Utils import authenticated


class StoriesHandler(AuthenticatedHandler):

    # GET /stories
    @coroutine
    def get(self):

        session_object = get_session()
        session = session_object()

        story_id = self.get_argument("id", default=None)
 
        if story_id is not None:
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
           
            self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return
            
        else:
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

            response = {"page": 1, "items": data}

            self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

            return

    # POST /stories/new
    @authenticated
    def post(self):
        request = self.request.body.decode("utf-8")
        jsonrequest = json.loads(request)

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

        response = {'saved': 'yes', 'id': str(story_id)}
        json.dumps(response)
        self.set_status(200, 'Ok')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
    
    @authenticated
    def put(self, story_id):

        request = self.request.body.decode("utf-8")
        json_request = json.loads(request)			
        
        session_object = get_session()
        session = session_object()

        try:

            story = session.query(Story).filter(Story.id == story_id).one()
            story.title = json_request["title"]
            story.content = json_request["content"]
            story.tags = json_request["tags"]
            story.category_id = json_request["category"]
            session.commit()

            status = 200
            status_str = 'Ok'
            response = {'id': story_id}

        except NoResultFound:
            status = 500
            status_str = "error"
            response = {'message': 'No story found for the specified id.'}

        except MultipleResultsFound:
            status = 500
            status_str = "error"
            response = {'message': 'Multiple stories found for the specified id.'}

        json.dumps(response)

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_status(status, status_str)
        self.write(response)

        return

    @authenticated
    def delete(self, story_id):

        session_object = get_session()
        session = session_object()

        try:

            story = session.query(Story).filter(Story.id == story_id).one()
            session.delete(story)
            session.commit()

            status = 200
            status_str = 'Ok'
            response = {'id': story_id}

        except NoResultFound:
            status = 500
            status_str = "error"
            response = {'message': 'No stories found for the specified id.'}

        except MultipleResultsFound:
            status = 500
            status_str = "error"
            response = {'message': 'Multiple Stories found for the specified id.'}

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_status(status, status_str)
        self.write(response)
        
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

        response = {"page": 1, "stories": data}

        self.set_header("Content-Type", "application/jsonp;charset=UTF-8")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
