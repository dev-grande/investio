const Pool = require('pg').Pool

const host = process.env['POSTGRES_HOST'] || '0.0.0.0';

const pool = new Pool({
  user: 'test_user',
  host: host,
  database: 'investio',
  password: 'test_password',
  port: 5432,
})

module.exports = {
    pool
};