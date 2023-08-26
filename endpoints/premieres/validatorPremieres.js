// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones
const validatorCreatePremiere = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Name must not be empty"),
  check("kindOfMovie")
    .exists()
    .withMessage("KindOfMovie is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("KindOfMovie must not be empty"),
  check("duration")
    .exists()
    .withMessage("Duration is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Duration must not be empty"),
  check("day")
    .exists()
    .withMessage("Day is required")
    .trim()
    .isDate()
    .withMessage("Day must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("Day must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errors: errors.array() })
      : next();
  },
];

// Exportar validaciones
module.exports = {
  validatorCreatePremiere,
};
