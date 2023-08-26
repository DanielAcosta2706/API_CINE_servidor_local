// Requerir Router de express
const router = require("express").Router();

// Requerir controladores
const {
  listAll,
  listOne,
  editOne,
  removeOne,
  register,
} = require("./cineController");

// Requerir validaciones
const { validatorCreateCine } = require("./validatorCine");

// Requerir carga de archivos
const fileUploadCine = require("./handleStorageCine");

// Rutas
// get all cine
router.get("/", listAll);

// get cine by id
router.get("/:id", listOne);

// Register new cine
router.post(
  "/register",
  fileUploadCine.single("file"),
  validatorCreateCine,
  register
);

// patch cine
router.patch("/:id", editOne);

// delete cine by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
