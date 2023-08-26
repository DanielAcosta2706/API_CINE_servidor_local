// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones
const validatorCreatePelicula = [
  check("nombre")
    .exists()
    .withMessage("Nombre is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Nombre must not be empty"),
  check("cine")
    .exists()
    .withMessage("Cine is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Cine must not be empty"),
  check("descripcion")
    .exists()
    .withMessage("Descripcion is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })

    .notEmpty()
    .withMessage("Descripcion must not be empty"),
  check("dia")
    .exists()
    .withMessage("Dia is required")
    .trim()
    .isDate()
    .withMessage("Dia must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("Dia must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Exportar validaciones
module.exports = {
  validatorCreatePelicula,
};
