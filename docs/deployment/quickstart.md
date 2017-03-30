# Quickstart guide
 
 **IMPORTANT**: Morpheus requires python3, hence the **python** command needs to be pointed at your python3 interpreter. Python2 is not supported.
 
 ## Install all the run dependencies specified in dependencies.
 
 ## Modify the configuration file (config.ini). 
 
 In particular you will need to adjust, at least, the following configuration parameters:
 
  - port: the port where you want your application to run (default: 8888).
  - database_user: the database user (default postgres).
  - database_port: the database port (default 5432).
  - database_name: the name of the database to be created and used (default morpheus).
  - database_password: the database password (default "").
  - serve_https : whether to use htpps or not. If set to true, you will need to specify the location of your SSL cert and key ( ssl_cert and ssl_key options) (default false).
  
 ## Run the application setup.
  
 ```
 python setup.py
 ```
 
 This step will install al required python packages (through pip), create the database with the name you chose on the previous step and run the migrations.
 
 ## Build the .js assets.
 
 Go to the frontend folder and build the javascript files.
 
 ```
 webpack --config webpack.config.js --progress --colors
 ```
 
 Or if you want the production build

 ```
 webpack --config webpack.prod.config.js --progress --colors
 ```
  
 Go back to the top folder.
 
 ## Run Morpheus
 
 ```
 python main.py
 ```
 