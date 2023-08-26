// Funcion de numero entero positivo
const notNumber = (id, res) => {
  if (isNaN(Number(id))) {
    res.status(400).json({ message: "ID must be a positive integer" });
    return true;
  } else {
    return false;
  }
};

// Exportar funcion de numero entero positivo
module.exports = notNumber;
