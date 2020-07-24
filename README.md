# frontend

## Table of Contents 

> If your `README` has a lot of info, section headers might be nice.

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#installation)
- [Login Flow](#login)

---

## Installation

### Clone

- Clone this repo to your local machine using `https://https://github.com/invest-io/frontend`

### Setup

> In /frontend directory, now install the necessary dependencies using npm

```shell
$ npm install
```

---

## Usage

> After set up, now start the application

```shell
$ npm start
```

- Create an account and upload your yearly dividends in the "Settings" page.  After uploading, your data should populate in the "Reports" page.

---

## Testing
> To Do

---

## Login Flow

> The login flow starts on the "Login" page, where you can redirect to the "Register" page if you need to create an account.  Below are two diagrams that show the login and register process.

### Login Process

![Alt text](public/login.png?raw=true "Login page flow")

- **Login Page**
    - On the Login Page component is and input box that takes in your username, password that on submit calls the login function of the userService helper.
- **User Service/User Reducer**
    - The User Service login function calls 2 methods:
        - The login reducer to check if the user exists
        - POST call ("users/authenticate") to the Mock Backend to add the user to our stored data
- **Mock Backend**
    - Upon successful authentification, the Browser history path is updated to "/" ("/dashboard"), which trigers the listener in the root <App> component to switch the current page to the newly updated history path, the Dashboard page. 
    - An unsuccessful authentification will send and alert to the Alert Reducer, which should trigger and alert message to show in the root <App> component

### Register Process

![Alt text](public/register.png?raw=true "Register page flow")

- **Register Page**
    - On the Register Page component is and form input that takes in your name, username and password. On supbmit it calls  that calls the register function of the userService helper.
- **User Service/User Reducer**
    - The User Service register function makes a POST call ("users/register") to the Mock Backend to add the user to our stored data
        - A successful POST will trigger the user reducer register function that will update the user to the user list.
        - An unsuccessful POST call will trigger the alert reducer to send an alert to the root <App> component. 
- **Mock Backend**
    - Upon successful registration, the Browser history path is updated to "/login", which trigers the listener in the root <App> component to switch the current page to the newly updated history path, the Login page so the user can login with their newly made account. 
        - The localStorage is updated with the new user.

---
