// Requerir Router de express
const router = require("express").Router();

// Requerir controladores de usuarios
const {
  listAll,
  listOne,
  register,
  login,
  forgot,
  reset,
  saveNewPass,
  editOne,
  removeOne,
} = require("./usersControl");

// Requerir validaciones de usuario y contraseña
const {
  validatorCreateUser,
  validatorLoginUser,
  validatorResetPassword,
} = require("./validatorUsers");

// Requerir carga de archivos
const fileUploadUser = require("./handleStorageUser");

// Rutas de usuarios
// get all users
router.get("/", listAll);

// get user by id
router.get("/:id", listOne);

// Register new user
router.post(
  "/register",
  fileUploadUser.single("file"),
  validatorCreateUser,
  register
);

// Login user
router.post("/login", validatorLoginUser, login);

// Forgot password
router.post("/forgot-password", forgot); //desde el front entra el mail del usuario, que olvidó la contraseña

// Create and send magic link
router.get("/reset/:token", reset); //mostramos el formulario de recuperación de contraseña
router.post("/reset/:token", validatorResetPassword, saveNewPass); //recibimos la nueva contraseña desde el formulario

// patch user
router.patch("/:id", editOne);

// delete user by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
