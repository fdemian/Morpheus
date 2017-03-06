from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from tornado.options import define, options, parse_config_file
from os import path

config_file = '../../config.ini'
config_file_path = path.join(path.dirname(__file__), config_file)


def get_database_url():
    define('database_user', type=str, group='application', help='Database name.')
    define('database_name', type=str, group='application', help='Database name.')
    define('database_port', type=str, group='application', help='Database port.')
    define('database_password', type=str, group='application', help='Database password.')
    parse_config_file(config_file_path)
    user = options.database_user
    name = options.database_name
    port = options.database_port
    password = options.database_password

    return 'postgresql+psycopg2://' + user + ":" + password + "@localhost:" + port + "/" + name


def get_session():
    connection_string = get_database_url()
    engine = create_engine(connection_string)
    session = sessionmaker(bind=engine)

    return session

