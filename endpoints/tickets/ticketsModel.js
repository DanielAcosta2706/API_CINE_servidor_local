// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllTickets = () => {
  const query = "SELECT * FROM tickets";
  try {
    return pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const buyNewTicket = (post) => {
  const query = "INSERT INTO tickets SET ?";
  try {
    return pool.query(query, post);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = { getAllTickets, buyNewTicket };
