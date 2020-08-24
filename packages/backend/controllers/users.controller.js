const pool_module = require('../helpers/pool');
const pool = pool_module.pool;
const jwt = require('../helpers/jwt');

const successMessage = { status: 'success', ok: true };
const errorMessage = { status: 400 };

const getUsers = (request, response) => {
    if (jwt.isLoggedIn(request)) {
      pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
    else {
      response.status(400).json({ status: 401, message: "error: unauthorized user" })
    }
}

const createUser = (request, response) => {
    const { firstName, lastName, username, password } = request.body
    console.log(request.body);
  
    pool.query('INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(successMessage)
    })
  }

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    if (jwt.isLoggedIn(request)) {
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        successMessage.data = `User deleted with ID: ${id}`;
        response.status(200).send(successMessage)
      })
    }
    else {
      response.status(400).json({ status: 401, message: "error: unauthorized user" })
    }
  }

const authUser = (request, response) => {
    const { username, password } = request.body;

    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      const dbResponse = results.rows[0];
      if (!dbResponse) {
        errorMessage.message = 'User or password is incorrect';
        return res.status(404).send(errorMessage);
      }
      const token = jwt.generateUserToken(dbResponse.username, dbResponse.id, dbResponse.firstName, dbResponse.lastName);
      delete dbResponse.password;
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return response.status(201).send(successMessage);
    })
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstName, lastName, username, password } = request.body

    pool.query(
      'UPDATE users SET firstName = $1, lastName = $2  username = $3, password = $4 WHERE id = $5',
      [firstName, lastName, username, password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        successMessage.data = `User modified with ID: ${id}`;
        response.status(200).send(successMessage)
      }
    )
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authUser
}


