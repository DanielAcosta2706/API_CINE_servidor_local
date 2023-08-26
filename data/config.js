// Requerir a mysql (dependencia)
const mysql = require("mysql");

// Requerir a util (modulo de Express)
const util = require("util");

// Creacion de pool de conexiones
const pool = mysql.createPool({
  host: process.env.db_host,
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
});

// Coneccion a la base de datos
pool.getConnection((err) => {
  err
    ? console.warn("No conectado a la B.D", { error: err.message })
    : console.log("Conexión con B.D. establecida...");
});

// Promificar el pool.query para usar async y await
pool.query = util.promisify(pool.query);

// Exportar el pool de conexiones
module.exports = pool;
