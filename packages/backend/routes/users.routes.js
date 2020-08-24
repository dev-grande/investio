module.exports = app => {

const db = require('../controllers/users.controller.js')
var router = require("express").Router();

    router.get('/', db.getUsers)
    router.post('/register', db.createUser)
    router.post('/authenticate', db.authUser)
    router.delete('/:id', db.deleteUser)
    router.put('/:id', db.updateUser)
    router.get('/:id', db.getUserById)

    app.use("/users", router);

}
