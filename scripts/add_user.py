from sqlalchemy import create_engine
from tornado.options import define, options, parse_config_file
from os import path
from getpass import getpass

config_file = '../config.ini'
config_file_path = path.join(path.dirname(__file__), config_file)


# Get the database URL from the configuration file.
def get_database_url():
    define('database_user', type=str, group='application', help='Database name.')    
    define('database_port', type=str, group='application', help='Database port.')
    define('database_password', type=str, group='application', help='Database password.')
    parse_config_file(config_file_path)
    user = options.database_user
    port = options.database_port
    password = options.database_password
    
    return 'postgresql+psycopg2://' + user + ":" + password + "@localhost:" + port


if __name__ == "__main__":
   print("Adding a user")
   print("====================================")
   name = input("Choose a username: ")
   password = getpass("Choose a password: ")
   
   print(name)
   print(password)
   
   
   
