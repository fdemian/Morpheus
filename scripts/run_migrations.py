import alembic.config
import os

alembicArgs = ['--raiseerr', 'upgrade', 'head']

current_dir = os.getcwd()
migration_directory = "backend/model"

os.chdir("backend")
os.chdir("model")
alembic.config.main(argv=alembicArgs)
os.chdir(current_dir)
