// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllPelicula = async () => {
  const query = "SELECT * FROM pelicula";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getPeliculaWith = (string) => {
  const query = `SELECT * FROM pelicula WHERE nombre LIKE '%${string}%'`;
  try {
    return pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getPeliculaById = async (id) => {
  const query = `SELECT * FROM pelicula WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const registerPelicula = async (pelicula) => {
  const query = `INSERT INTO pelicula SET ?`;
  try {
    return await pool.query(query, pelicula);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editPeliculaById = async (id, pelicula) => {
  const query = `UPDATE pelicula SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, pelicula);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const deletePeliculaById = async (id) => {
  const query = `DELETE FROM pelicula WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllPelicula,
  getPeliculaWith,
  getPeliculaById,
  registerPelicula,
  editPeliculaById,
  deletePeliculaById,
};
