const { Pool } = require('pg');
const pool = new Pool({
    port: '5432',
    user: 'postgres',
    host: 'localhost',
    database: 'nuri',
    password: 'password',
});

module.exports = pool;

