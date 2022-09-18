const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  database: 'qa',
  password: '',
  port: 5432,
  host: 'localhost'
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// });

module.exports = pool;