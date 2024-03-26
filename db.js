const POOL = require("pg").Pool;
require("dotenv").config();

const pool = new POOL({
    user: "assessment_db_dv4n_user",
    host: "dpg-co1df5uct0pc73fm8hq0-a.ohio-postgres.render.com",
    database: "assessment_db_dv4n",
    password: "1ssfevKiRAcLWqnCT1abb92kAK8dye9i",
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Or set to true if you have a valid SSL certificate
    },
  });

module.exports = pool;

