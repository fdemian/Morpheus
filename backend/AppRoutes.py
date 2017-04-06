# Route imports
from backend.routes.Stories import StoriesHandler
from backend.routes.Story import StoryHandler
from backend.routes.Stories import StoriesByUserHandler
from backend.routes.Users import UsersHandler, UserHandler
from backend.routes.Categories import CategoriesHandler, CategoryHandler, CategoryTopicsHandler
from backend.routes.Index import IndexHandler
from backend.routes.Auth import LogoutHandler
from backend.routes.Comments import CommentsHandler
from backend.routes.ConfigOptions import ConfigHandler
from backend.routes.Notifications import Notifications
from backend.routes.Alerts import AlertsHandler
from backend.routes.Auth import BaseAuth
# from backend.routes.TwitterRedirect import TwitterHandler
from backend.routes.Activation import UserActivationHandler
from tornado.web import StaticFileHandler


def get_app_routes(static_path):

    notifications_handler = []
    params = {'notifications_handler': notifications_handler}

    routes = [
       (r'/api/alerts', AlertsHandler),
       (r'/api/alerts/(.*)', AlertsHandler),
       (r"/api/stories/(.*)/comments", CommentsHandler, params),
       (r"/api/stories", StoriesHandler),
       (r"/api/stories/([0-9]+)", StoryHandler),
       (r"/api/story/([0-9]+)", StoryHandler),
       (r"/api/users/(.*)/stories", StoriesByUserHandler),
       (r"/api/users", UsersHandler),
       (r"/api/users/(.*)", UserHandler),
       (r"/api/categories", CategoriesHandler),
       (r"/api/categories/([0-9]+)", CategoryHandler),
       (r"/api/categories/([0-9]+)/([0-9]+)", CategoryTopicsHandler),
       (r"/api/auth", BaseAuth),
       (r"/api/auth/logout/", LogoutHandler),
       (r'/api/config',  ConfigHandler),
       (r'/api/notifications', Notifications, params),
       (r'/api/activation', UserActivationHandler),
       (r'/static/(.*)', StaticFileHandler, {'path': static_path}),
       (r"/.*", IndexHandler)
       # (r'/twitter', TwitterHandler)
    ]

    return routes
