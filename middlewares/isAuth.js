// Requerir verificacion de token
const { tokenVerify } = require("../utils/handleJWT");

// Verifica si la peticion trae una autorizacion
const isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    let error = new Error("No token provided");
    error.status = 403;
    return next(error);
  }
  const token = req.headers.authorization.split(" ").pop();
  const isValidToken = await tokenVerify(token);
  if (isValidToken instanceof Error) {
    let error = new Error("Invalid or Expired Token");
    error.status = 403;
    return next(error);
  }
  req.token = isValidToken;
  next();
};

// Exportar el middlewares isAuth
module.exports = isAuth;
