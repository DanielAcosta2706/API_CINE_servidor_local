// Requerir pool de conexiones
const pool = require("../../data/config");

// Trae todos los usuarios de la tabla users
const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Trae un usuario con el id requerido
const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Registra un nuevo usuario
const registerUser = async (user) => {
  const query = `INSERT INTO userswww SET ?`;
  try {
    return await pool.query(query, user);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Loguea un usuario existente
const loginUser = async (error) => {
  const query = `SELECT * FROM users WHERE email = '${error}'`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Modifica un usuario con el id requerido
const editUserById = async (id, user) => {
  const query = `UPDATE users SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, user);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Borra un usuario con el id requerido
const deleteUserById = async (id) => {
  const query = `DELETE FROM users WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  editUserById,
  deleteUserById,
};
