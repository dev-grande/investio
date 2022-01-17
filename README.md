<p align="center"> 
  <img src="https://drive.google.com/uc?export=view&id=1z9_X5uvEfuPqrVxRbAWlLlviN9PdhcCp" alt="div_graphs" width="300px"/>
</p>

[divgraphs.diana-grande.com](https://divgraphs.diana-grande.com)

## Table of Contents

* [Background](#background)
  * tech stack
  * frontend
  * backend
  * flow diagram
* [Development](#development)
* [Usage](#usage)
  * [Register and Login](#register-and-login)
  * Import CSV transaction data from TD Ameritrade
  * Data Import and Edit
  * Overview of transaction data
  * View transactions and export data
  * PSQL Database Table Structure
  * Node JS Server Routes
* [Features](#features)
  * [Login Flow](#login-flow)
* [GCloud VM Setup](#vm)
  * HTTP
  * HTTPS

## Background

**Frontend**

Div Graphs is a web application that helps you visualize and comprehend your investment portfolio using imported transaction data.  Upon creating an account, you can upload your transaction data through .csv files and view the visualized data on the dashboard page. Your current stocks owned, dividend earnings history and overall portfolio information are shown on this page. The frontend part of this project was developed with with React, Redux, Javascript, and Docker.

**Backend**

Div Graphs is a web application that helps you visualize and comprehend your investment portfolio using imported transaction data. Through the UI, the user uploads transaction data, which is sent to the NodeJS server and is then handled and stored in the PSQL database. PSQL commands are used to pull certain parts of the data to be displayed in the frontend.  The IEX Trading API was used to get the most recent open and close price for stocks. The backend part of this project was developed with with Node JS, Javascript, PSQL and Docker.


<p align="center"> 
  <h3>Flow Diagram</h3>
  <img src="https://drive.google.com/uc?export=view&id=13bRan_InKjETPpcZnZLkGzu6lg3oKm3-" alt="div_graphs" width="800px"/>
</p>

## Development

### Local Dependencies

* `node`
* `yarn`
* `docker`
* `docker-compose`
* `lerna`
* `psql`

### Setup

* Clone repo to your local machine:
```sh
git clone git@github.com:invest-io/investio.git
```
* Bootstrap project:
```sh
cd investio
lerna bootstrap
```
* Create database and generate mock_data
```sh
npm run dkcu:db
cd packages/scripts
# generate mock data:  runs for 1 - 2 mins 
node index.js
```
* Start project:
```sh
# change back to root investio directory
lerna run start
```
### Docker

* Clone repo to your local machine:
```sh
git clone git@github.com:invest-io/investio.git
```
* Create images for backend and frontend
```sh
cd packages/backend
docker build -t docker.pkg.github.com/dev-grande/investio/investio-backend:latest .

cd ../frontend  # specify the host of your backend in the build arg [BACKEND_HOST], default is localhost
docker build --build-arg BACKEND_HOST=0.0.0.0 -t docker.pkg.github.com/dev-grande/investio/investio-frontend:latest .
```

* Move ssl certificates to project
```sh
cd packages/scripts  # from root investio directory
./ssl.sh
```
- specify your postgres host in the file:  investio/docker/dev/docker_compose.yml
  - define env variable POSTGRES_HOST, default is localhost

* Run docker application
```sh
cd docker/dev # from root investio directory
docker-compose up -d 

# to stop and prune application
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker volume prune -f
```

* Generate mock user data after starting application
```sh
cd packages/scripts # from root investio directory
# generate mock data:  runs for 1 - 2 mins 
node index.js
```

## Usage

### Register and Login
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1UIw0fZGlRGl7YWP6r5bFiNLnuSxrTXm7" height="600">
</p>
  
<br />

### Import CSV transaction data from TD Ameritrade [Settings Page]

<br />

**TD Ameritrade download CSV**
* Export your transaction data by year to a .csv using the 'Download' feature under your TD Ameritrade History and Statements.
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1_lhrSOvZsH3gorflFFKG4oLMu2DSkVjo" height="370">
</p>
<br /><br />

**[Settings Page]  -  Data Import and Edit**
<br />

  - Using the .csv file that you downloaded from Ameritrade, you can import the file under "DATA IMPORT" by either:
      - Click and selecting the file 
      - Drag and dropping the file
  - Once uploaded, the years corresponding to the file should show in the "EDIT DATA" section.

<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1ev172uFsCBz3D410qfo8W5Gjha85A67Y" height="600">
</p>

<br />

### Overview of transaction data [Dashboard Page]

- After importing your transaction data, a visualization and overview of the transactions can be seen below in the Dashboard Page.  
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1Nf_3mpI8K8UWGHu-e8-_SBF67hVWpnjA" height="650">
</p>

<br />

### View transactions and export data [Reports Page]

- The reports page shows the data in table form, in which each table has the option to be exported into a .csv file.
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1ngco-o0Pj2OcjTdpksrZgBGg3SwC5UQL" height="400">
</p>

<br />

### PSQL Database Table Structure

<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1zHD-fIz4oyTfp0gYaf1cH67tg26iTKIi">
</p>

- The users table is linked to the raw_data table in a one-to-many relationship linked through the user_id entry.
> By default the PSQL database is running on PORT 5432

<br />

### Node JS Server Routes
> By default the server is running on http://localhost:4000

**Users route** (queries the users table)

   - GET http://localhost:4000/users/

     - Gets all users data.
   - GET http://localhost:4000/users/:id
     - Gets specific users with the id from the url parameter (id).
   - POST http://localhost:4000/users/register
     - Inserts and new user in the users table, using the data from the request body consisting of { firstName, lastName, username, password }.
   - POST http://localhost:4000/users/authenticate
     - Verifies if the user data from the request body consisting of { username, password } is valid.  The username and password is queried in the database and if a result if found, a JWT token is generated and sent back.
   - DELETE http://localhost:4000/users/:id
     - Deletes the user corresponding the id provided in the url id parameter if one exists.

<br />

**Data route** (queries the raw_data table)
> All of the routes below need a JWT token in the header that corresponds to a verified users from /users/authenticate.
   - POST http://localhost:4000/data/upload
     - Inserts raw_data entries from request.body.upload_data parameter.
   - GET http://localhost:4000/data/years/:id
     - Gets a list of all the years from the raw_data entries.
   - DELETE http://localhost:4000/data/delete
     - Deletes all the entries from a specific year.  The request body consists of { user_id, year }.
   - GET http://localhost:4000/data/dashboard/:id
     - Gets relevant data for the dashboard page from the raw_data table corresponding to the user_id from the url id parameter.
         - Entries of type = dividend aggregated by month
         - Cash value, account value, stock value, dividend earning total
         - List of stocks currently owned, derived from buy and sell transactions
            - calls IEX Trading API to get recently closed price of each stock.
   - GET http://localhost:4000/data/reports/:id
     - Gets relevant data for the reports page from the raw_data table corresponding to the user_id from the url id parameter.
         - List of all dividend transactions
         - Entries of type = dividend aggregated by month
         - List of all buy and sell transactions
      
   - POST http://localhost:4000/data/dividend
     - Gets dividend earnings for a specific stock for a user.  The request body consists of { user_id, symbol (stock symbol) }.

<br />

## Features

### Login Flow

The login flow starts on the "Login" page, where you can redirect to the "Register" page if you need to create an account.  Below are two diagrams that show the login and register process.

**Login Process**

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1mySNUOzue6mm3x7HBQYOpS-KzpjtiFRw">
</p>

- **Login Page**
    - On the Login Page component is and input box that takes in your username, password that on submit calls the login function of the userService helper.
- **Reducers**
    - The User Reducer login function calls User Service login function and handles whether the call is a success or error:
        - Upon successful authentication, the Browser history path is updated to "/" ("/dashboard"), which triggers the listener in the App component to switch the current page to the Dashboard page. 
        - An unsuccessful authentication will send and alert to the Alert Reducer, which should trigger and alert message to show in the root <App> component
    - The Alert Reducer updates an alert in the App component upon update with an error
- **User Service**
    - The User Service login function fetch POST call to the backend.
        - POST call ("users/authenticate") to the backend verify if the username and password provided is correct
            - If a the username does not exist in the database or if the password is incorrect a corresponding error will be returned which should trigger an update to the Alert reducer.
            - Otherwise the fetch call is a success and the user data and jwt token is returned.

### Register Process

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1jynxTei0PnP-MfWznFamxhmchOSZbdPD">
</p>

- **Register Page**
    - On the Register Page component is and form input that takes in your name, username and password. On submit it calls  that calls the register function of the userService helper.
- **Reducers**
    - The User Reducer register function calls User Service register function and handles whether the call is a success or error:
        - Upon successful registration, the Browser history path is updated to "/login", which triggers the listener in the App component to switch the current page to the Login page so the user can login with their newly made account. 
        - An unsuccessful registration will send an alert to the Alert Reducer, which should trigger an alert message shown the App component
    - The Alert Reducer updates an alert in the App component upon update with an error.
- **User Service**
    - The User Service register function is a fetch POST call to the backend.
        - POST call ("users/authenticate") to the backend to add the user to the stored users data
            - If a user with the requested username already exists, then an error is returned which should updated the Alert reducer through the User reducer.
            - Otherwise the user is added to the database and a success status is returned.

---

## GCloud VM Setup
### Initial Setup
#### SSH into VM using the VM "Open in browser window" option 
  > Compute Engine > VM instances > Select Instance > Connect SSH using "Open in browser window"

#### Follow instructions from [Development](#development) section to set up machine
> In addition download the following dependences
* `git`
* `certbot`

* Run the setup script (location: investio/packages/scripts/vm_init.sh) upon VM creation to install the necessary dependencies for the project
> For line 33 of the script replace example.com with the domain used, in this case it is divgraphs.diana-grande.com.
```sh
./vm_int.sh
```
### HTTP and HTTPS Setup

* Run ssl script (location: investio/packages/scripts/ssl.sh) to copy ssl created in the init script to the docker folder
> Change the domain name on line 4 and 5 to the domain name used before running
```sh
./ssl.sh
```

* Follow Docker instructions to run application on the VM using Docker
