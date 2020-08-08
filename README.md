# frontend

<p align="center">
  <img src="public/logo_name.png">
</p>

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Login Flow](#login)

---

## Installation

### Clone

- Clone this repo to your local machine using `https://https://github.com/invest-io/frontend`

### Setup

> In /frontend directory, now install the necessary dependencies using yarn

```shell
$ yarn
```

---

## Usage

> After set up, now start the application

```shell
$ yarn start
```

- Create an account and upload your yearly dividends in the "Settings" page.  After uploading, your data should populate in the "Reports" page.

> Docker setup
```sh
# build frontend app
yarn build
# build image
docker build -t docker.pkg.github.com/invest-io/frontend/frontend:latest .
# run image
docker run --name=test -p 80:80 -td docker.pkg.github.com/invest-io/frontend/frontend:latest
```

---

## Testing
```shell
$ yarn test
```
---

## Login Flow

> The login flow starts on the "Login" page, where you can redirect to the "Register" page if you need to create an account.  Below are two diagrams that show the login and register process.

### Login Process

![Alt text](public/login.png?raw=true "Login page flow")

- **Login Page**
    - On the Login Page component is and input box that takes in your username, password that on submit calls the login function of the userService helper.
- **Reducers**
    - The User Reducer login function calls User Service login function and handles whether the call is a success or error:
        - Upon successful authentification, the Browser history path is updated to "/" ("/dashboard"), which triggers the listener in the Appcomponent to switch the current page to the Dashboard page. 
        - An unsuccessful authentification will send and alert to the Alert Reducer, which should trigger and alert message to show in the root <App> component
    - The Alert Reducer updates an alert in the App component upon update with an error
- **User Service**
    - The User Service login function fetch POST call to the backend.
        - POST call ("users/authenticate") to the backend verify if the username and password provided is correct
            - If a the username does not exist in the database or if the password is incorrect a corresponding error will be returned which should trigger an update to the Alert reducer.
            - Otherwise the fetch call is a success and the user data and jwt token is returned.


### Register Process

![Alt text](public/register.png?raw=true "Register page flow")

- **Register Page**
    - On the Register Page component is and form input that takes in your name, username and password. On supbmit it calls  that calls the register function of the userService helper.
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


