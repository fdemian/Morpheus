# Morpheus

Blog application powered by tornado and material UI. 

## How to run 

 Instructions to run the application. See the deployment section of the documentation for a more detailed overview.

### Prerequisites

 To run this in your local environment you must install the following dependencies first:

 - Python 3.4+
 - PostgreSQL 
 - npm + yarn
 
### Installation

 Once you've installed all the dependencies follow this steps:

 1) Edit your configuration file
 
 2) Run the application configuration:
   
  ```python
  python3 setup.py 
  ```

  This will create your database, run the migrations and download all necesary python packages.
 
 3) CD into the frontend directory, download the required pacakges and build the application:

   ```sh
   cd frontend
   yarn
   webpack --progress --colors
   ```
	
 If you want to get the optimized production build, tell webpack to use the production file instead:

 ```sh
 webpack webpack.prod.config.js --progress --colors
 ```

 4) Run the application 

 ```python
 <python3> main.py
 ```