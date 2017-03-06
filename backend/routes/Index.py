from tornado.web import RequestHandler


class IndexHandler(RequestHandler):

    # GET
    def get(self):
        index_dir = "../../static/index.html"
        self.render(index_dir)
