const { Pool } = require('pg');

require("dotenv").config();

let localPoolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'edialeomo12',
    port: 5432,
}

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  } : localPoolConfig;

  const pool = new Pool(poolConfig);

module.exports = pool