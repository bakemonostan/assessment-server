const POOL = require("pg").Pool;
require("dotenv").config();

const pool = new POOL({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'edialeomo12',
    port: 5432,
});

module.exports = pool