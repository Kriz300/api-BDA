const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'ASD123',
    database: 'bda',
    port: '5432'
});

module.exports = pool;