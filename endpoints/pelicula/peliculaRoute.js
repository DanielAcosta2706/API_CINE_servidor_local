// Requerir Router de express
const router = require("express").Router();

// Requerir controladores
const {
  listAll,
  listOne,
  editOne,
  removeOne,
  register,
} = require("./peliculaController");

// Requerir validaciones
const { validatorCreatePelicula } = require("./validatorPelicula");

// Requerir carga de archivos
const fileUploadPelicula = require("./handleStoragePelicula");

// Rutas
// get all pelicula
router.get("/", listAll);

// get pelicula by id
router.get("/:id", listOne);

// Register new pelicula
router.post(
  "/register",
  fileUploadPelicula.single("file"),
  validatorCreatePelicula,
  register
);

// patch pelicula
router.patch("/:id", editOne);

// delete pelicula by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
