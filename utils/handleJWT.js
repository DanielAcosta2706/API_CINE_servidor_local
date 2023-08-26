// Requerir a jsonwebtoken (dependencia)
const jwt = require("jsonwebtoken");

// Requerir clave secreta (.env)
const key = process.env.jwt_secret;

// Crea el token, recibe el payload (user) y una medida de tiempo (time) para generar un token con tiempo de expiración variable, dependiendo de nuestra necesidad
const tokenSign = async (user, time) => {
  return jwt.sign(user, key, { expiresIn: time });
};

// Verifica que el token esté firmado por el backend y también que no haya expirado
const tokenVerify = async (token) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return error;
  }
};

// Exportar el firma y verificacion del token
module.exports = { tokenSign, tokenVerify };
