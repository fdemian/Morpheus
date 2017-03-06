from installtools import setup

scripts = [
     'create_database.py', 
     'run_migrations.py'
]

setup("Shelob", "requirements.txt", scripts)