from tornado.web import RequestHandler


class ConfigHandler(RequestHandler):

    def get(self):

        """

        Return application configuration parameters.
        This route only returns parameters that are public.
        All API secrets and other parameters are not returned.

        """

        try:

            response = {
                'data': {
                    "oauth": [
                        {
                            'name': 'facebook',
                            'key': self.settings["facebook_api_key"],
                            'authorizeURL': self.settings["facebook_redirect_url"],
                            'iconURL': self.settings["facebook_icon_url"]
                        },
                        {
                            'name': 'google',
                            'key': self.settings["google_oauth_key"],
                            'authorizeURL': self.settings["google_redirect_url"],
                            'iconURL': self.settings["google_icon_url"]
                        },
                        {
                            'name': 'github',
                            'key': self.settings["github_client_id"],
                            'authorizeURL': self.settings["github_redirect_url"],
                            'iconURL': self.settings["github_icon_url"]
                        }]
                }
            }

            self.set_status(200, 'Ok')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)

        except:

            response = {'error': "Could not obtain configuration options."}
  
            self.set_status(500, 'Error')
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
