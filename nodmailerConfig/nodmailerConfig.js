// Requerir a nodemailer (dependencia)
const nodemailer = require("nodemailer");

// Conectar y configurar nodemailer con el proyecto
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.mailtrap_user,
    pass: process.env.mailtrap_pass,
  },
});

// Exportar conexion y configuracion de nodemailer
module.exports = transport;
