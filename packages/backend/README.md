<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1z9_X5uvEfuPqrVxRbAWlLlviN9PdhcCp">
</p>

---

## Background

Div Graphs is a web application that helps you visualize and comprehend your investment portfolio using imported transaction data. Through the UI, the user uploads transaction data, which is sent to the NodeJS server and is then handled and stored in the PSQL database. PSQL commands are used to pull certain parts of the data to be displayed in the frontend.  The IEX Trading API was used to get the most recent open and close price for stocks. The backend part of this project was developed with with Node JS, Javascript, PSQL and Docker.

---

## Usage

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

---

## Development

**Setup Locally**

* Install [psql](https://www.postgresql.org/download) dependency
* Install [docker](https://www.docker.com/get-started) dependency
* Clone the backend repo to your local machine:
```sh
git clone git@github.com:invest-io/backend.git
```
* Start the containers with the docker compose:
```sh
cd db/
docker-compose up -d
```
* In the backend directory, install dependencies with yarn and start backend application server.
```sh
yarn
yarn start
```
> By default the server is running on http://localhost:4000
