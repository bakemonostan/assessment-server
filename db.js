const POOL = require("pg").Pool;
require("dotenv").config();

const pool = new POOL({
  user: "todo_ocsu_user",
  host: "dpg-cnvv5ff109ks73bo9v4g-a.oregon-postgres.render.com",
  database: "todo_ocsu",
  password: "todo_ocsu",
  port: 5432,
});

module.exports = pool;
