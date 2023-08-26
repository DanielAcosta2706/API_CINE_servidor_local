// Express
const express = require("express");
const server = express();

// Dependencias y modulos de Express
require("dotenv").config();
const path = require("path");
const hbs = require("express-handlebars");

// Archivos requeridos
require("./data/config");

// Requerir puerto (.env)
const PORT = process.env.PORT || 3000;

// Reconocimiento del objeto de solicitud entrante como un objeto JSON
server.use(express.json());

// Reconocimiento del objeto de solicitud entrante como cadenas, matrices o cualquier tipo
server.use(express.urlencoded({ extended: true }));

// Servicio de archivos estático
server.use(express.static("public"));

// Archivos bootstrap
server.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
server.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

// Configuracion Handlebars
server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));
server.engine("hbs", hbs.engine({ extname: "hbs" }));

// Pagina inicial de prueba
server.get("/", (req, res) => {
  const content = `
    <h1>Bienvenido</h1>
    <h2>Server con Express</h2>
    <pre>Prueba de servidor con Nodejs y el framework Express</pre>
    `;
  res.send(content);
});

// -------------------------***Rutas de usuarios***-------------------------
// Rutas /users endpoint
server.use("/users", require("./endpoints/users/usersRoute"));

// Rutas /tickets endpoint
server.use("/tickets", require("./endpoints/tickets/ticketsRoute"));

// -------------------------***Rutas de peliculas***-------------------------
// Rutas /movies endpoint
server.use("/pelicula", require("./endpoints/pelicula/peliculaRoute"));

// -------------------------***Rutas de cine***-------------------------
// Rutas /cinemas endpoint
server.use("/cine", require("./endpoints/cine/cineRoute"));

// -------------------------***Rutas de proximos estrenos***-------------------------
// Rutas /premieres endpoint
server.use("/premieres", require("./endpoints/premieres/premieresRoute"));

// Rutas no encontradas (404)
server.use((req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message = "Resource not found";
  next(error);
});

// Controlador de errores (500)
server.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
    error.message = "Internal Error Server";
  }
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
});

// Servidor corriendo...
server.listen(PORT, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(`App corre en https://apicine-deploy.herokuapp.com/`);
});
