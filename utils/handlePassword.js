// Requerir a bcrypt (dependencia)
const bcrypt = require("bcrypt");

// Agregar aleatoriedad a la encriptacion de la contraseña
const saltRounds = 10;

// Encriptar contraseña
const hashPassword = async (password) => {
  return (hashedPassword = await bcrypt.hash(password, saltRounds));
};

// Chequeo de contraseña
const checkPassword = async (originalPassword, hashedPassword) => {
  return (passwordMatch = await bcrypt.compare(
    originalPassword,
    hashedPassword
  ));
};

// Exportar encriptacion y chequeo de contraseña
module.exports = { hashPassword, checkPassword };
