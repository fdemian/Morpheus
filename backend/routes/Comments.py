import json
from backend.model.sessionHelper import get_session
from backend.model.models import Story, Comment
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from .Auth import AuthenticatedHandler


class CommentsHandler(AuthenticatedHandler):

    def initialize(self, notifications_handler):
        self.notifications_handler = notifications_handler

    # POST /stories/id/comments
    def post(self, story_id):

        request = self.request.body.decode("utf-8")
        jsonrequest = json.loads(request)

        if not self.get_current_user():
            response = {'Error': "Token is invalid."}
            self.set_status(301, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
        
        author_name = jsonrequest["name"]
        content = jsonrequest["content"]
        avatar = jsonrequest["avatar"]
        author_url = jsonrequest["url"]

        try:
            session_object = get_session()
            session = session_object()
            story = session.query(Story).filter(Story.id == story_id).one()

            comment = Comment()
            comment.author = author_name
            comment.content = content
            comment.avatar = avatar
            comment.url = author_url
            comment.story_id = story.id

            session.add(comment)
            session.commit()

            json_comment = {
                'id': comment.id,
                'author': comment.author,
                'content': comment.content,
                'avatar': comment.avatar,
                'url': comment.url,
                'story': story.title,
                'storyId': story.id
            }

            self.notify_new_comment(json_comment)

            response = {'data': json_comment}

            status = 200
            status_str = 'Ok'

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

    def notify_new_comment(self, new_comment):

        notifications_handler = self.notifications_handler[0]

        text = new_comment["author"] + " commented on " + new_comment["story"]
        link = "/stories" + str(new_comment["storyId"]) + "/" + new_comment["story"]

        message = {
           'type': "comment",
           'text': text,
           'link': link
        }

        json.dumps(message)

        notifications_handler.write_message(json.dumps(message))
