# Route imports
from api.routes.Stories import StoriesHandler
from api.routes.Story import StoryHandler
from api.routes.Stories import StoriesByUserHandler
from api.routes.Users import UsersHandler, UserHandler
from api.routes.Categories import CategoriesHandler, CategoryHandler, CategoryTopicsHandler
from api.routes.Index import IndexHandler
from api.routes.Comments import CommentsHandler
from api.routes.ConfigOptions import ConfigHandler
from api.routes.Notifications import Notifications
from api.routes.Alerts import AlertsHandler
from api.routes.Authentication import Authentication
from api.routes.Activation import UserActivationHandler
from api.routes.Logout import LogoutHandler
from tornado.web import StaticFileHandler


def get_app_routes(static_path, notifications_enabled):

    routes = [
       (r"/api/stories/([0-9]+)", StoryHandler),
       (r"/api/story/([0-9]+)", StoryHandler),
       (r"/api/stories/(.*)/comments", CommentsHandler),
       (r"/api/stories", StoriesHandler),
       (r"/api/users/(.*)/stories", StoriesByUserHandler),
       (r"/api/users", UsersHandler),
       (r"/api/users/(.*)", UserHandler),
       (r"/api/categories", CategoriesHandler),
       (r"/api/categories/([0-9]+)", CategoryHandler),
       (r"/api/categories/([0-9]+)/([0-9]+)", CategoryTopicsHandler),
       (r"/api/auth", Authentication),
       (r"/api/auth/logout/", LogoutHandler),
       (r'/api/config',  ConfigHandler),
       (r'/api/activation', UserActivationHandler),
       (r'/api/notifications', Notifications),
       (r'/api/alerts', AlertsHandler),
       (r'/api/alerts/', AlertsHandler),
       (r'/static/(.*)', StaticFileHandler, {'path': static_path}),
       (r"/.*", IndexHandler)
    ]

    if notifications_enabled:
        print("/")

    return routes
