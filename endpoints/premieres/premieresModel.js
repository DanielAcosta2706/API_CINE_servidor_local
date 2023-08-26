// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllPremieres = async () => {
  const query = "SELECT * FROM premieres";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getPremiereById = async (id) => {
  const query = `SELECT * FROM premieres WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const registerPremiere = async (premiere) => {
  const query = `INSERT INTO premieres SET ?`;
  try {
    return await pool.query(query, premiere);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editPremiereById = async (id, premiere) => {
  const query = `UPDATE premieres SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, premiere);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const deletePremiereById = async (id) => {
  const query = `DELETE FROM premieres WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllPremieres,
  getPremiereById,
  registerPremiere,
  editPremiereById,
  deletePremiereById,
};
