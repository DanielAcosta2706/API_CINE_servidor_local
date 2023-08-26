// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllCine = async () => {
  const query = "SELECT * FROM cine";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getCineWith = (string) => {
  const query = `SELECT * FROM cine WHERE nombre LIKE '%${string}%'`;
  try {
    return pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getCineById = async (id) => {
  const query = `SELECT * FROM cine WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const registerCine = async (cine) => {
  const query = `INSERT INTO cine SET ?`;
  try {
    return await pool.query(query, cine);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editCineById = async (id, cine) => {
  const query = `UPDATE cine SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, cine);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const deleteCineById = async (id) => {
  const query = `DELETE FROM cine WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllCine,
  getCineWith,
  getCineById,
  registerCine,
  editCineById,
  deleteCineById,
};
