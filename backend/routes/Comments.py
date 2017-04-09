import json
from backend.model.sessionHelper import get_session
from backend.model.models import Story, Comment, Notification, User
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from .Auth import AuthenticatedHandler


class CommentsHandler(AuthenticatedHandler):

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
            author = session.query(User).filter(User.username == author_name).one()

            comment = Comment()
            comment.author = author.username
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

            text = comment.author + " commented on " + story.title
            link = "/stories/" + str(story.id) + "/" + story.title

            self.save_notification(author, "comment", text, link)
            self.notify_new_comment(text, link)

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

        return

    def notify_new_comment(self, text, link):

        notifications_handler = self.settings['notifications_handler']

        message = {
           'type': "comment",
           'text': text,
           'link': link
        }

        notifications_handler.write_message(json.dumps({'data': [message]}))

        return

    @staticmethod
    def save_notification(user, notification_type, text, link):

        notification_to_save = Notification()
        notification_to_save.user_id = user.id
        notification_to_save.type = notification_type
        notification_to_save.text = text
        notification_to_save.link = link
        notification_to_save.read = False

        session_object = get_session()
        session = session_object()
        session.add(notification_to_save)
        session.commit()

        return
