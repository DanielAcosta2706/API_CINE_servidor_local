// Requerir Router de express
const router = require("express").Router();

// Requerir controladores
const {
  listAll,
  listOne,
  editOne,
  removeOne,
  register,
} = require("./premieresControl");

// Requerir validaciones
const { validatorCreatePremiere } = require("./validatorPremieres");

// Requerir carga de archivos
const fileUploadPremiere = require("./handleStoragePremieres");

// Rutas
// get all premieres
router.get("/", listAll);

// get premiere by id
router.get("/:id", listOne);

// Register new premiere
router.post(
  "/register",
  fileUploadPremiere.single("file"),
  validatorCreatePremiere,
  register
);

// patch premiere
router.patch("/:id", editOne);

// delete premiere by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
