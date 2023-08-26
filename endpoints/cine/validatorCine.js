// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones
const validatorCreateCine = [
  check("nombre")
    .exists()
    .withMessage("Nombre is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Nombre must not be empty"),
  check("pelicula")
    .exists()
    .withMessage("Pelicula is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Pelicula must not be empty"),
  check("dia")
    .exists()
    .withMessage("Dia is required")
    .trim()
    .isDate()
    .withMessage("Dia must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("Dia must not be empty"),
  check("idioma")
    .exists()
    .withMessage("Idioma is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Idioma must not be empty"),
  check("clasificacion")
    .exists()
    .withMessage("Clasificacion is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")
    .notEmpty()
    .withMessage("Clasificacion must not be empty")
    .isLength({ min: 1, max: 1 })
    .withMessage("Character count: Only 1"),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Exportar validaciones
module.exports = {
  validatorCreateCine,
};
