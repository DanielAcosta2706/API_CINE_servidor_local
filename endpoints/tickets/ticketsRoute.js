// Requerir Router de express
const router = require("express").Router();

// // Requerir controladores
const { getAll, buyOne } = require("./ticketsControl");

// Requerir middleware de autenticacion
const isAuth = require("../../middlewares/isAuth");

// get all tickets
router.get("/", getAll);

// buy new ticket
router.post("/", isAuth, buyOne);

// Exportar las rutas
module.exports = router;
