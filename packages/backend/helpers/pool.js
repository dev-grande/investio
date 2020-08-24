const Pool = require('pg').Pool

const pool = new Pool({
  user: 'test_user',
  host: 'localhost',
  database: 'investio',
  password: 'test_password',
  port: 5432,
})

module.exports = {
    pool
};