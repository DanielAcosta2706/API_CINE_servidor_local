// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones de usuario
const validatorCreateUser = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")
    .notEmpty()
    .withMessage("Name must not be empty")
    .isLength({ min: 2, max: 90 })
    .withMessage("Character count: min 2; max 90"),
  check("surname")
    .exists()
    .withMessage("Surnameame is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")
    .notEmpty()
    .withMessage("Surname must not be empty")
    .isLength({ min: 2, max: 90 })
    .withMessage("Character count: min 2; max 90"),
  check("dateBirth")
    .exists()
    .withMessage("DateBirth is required")
    .trim()
    .isDate()
    .withMessage("DateBirth must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("DateBirth must not be empty"),
  check("gender")
    .exists()
    .withMessage("Gender is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")
    .notEmpty()
    .withMessage("Gender must not be empty"),
  check("phone")
    .exists()
    .withMessage("Phone is required")
    .trim()
    .isNumeric()
    .withMessage("Only numbers")
    .notEmpty()
    .withMessage("Phone must not be empty")
    .isLength({ min: 10, max: 15 })
    .withMessage("Number: min 10; max 15"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Crear validaciones de login
validatorLoginUser = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Crear validaciones de contraseñas
const validatorResetPassword = [
  check("password_1")
    .exists()
    .isLength({ min: 8, max: 15 })
    .withMessage("Character count: min 8, max 15")
    .trim(),
  check("password_2").custom(async (password_2, { req }) => {
    if (req.body.password_1 !== password_2) {
      throw new Error("Both passwords must be identical");
    }
  }),
  (req, res, next) => {
    const { token } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const arrWarnings = errors.array();
      res.render("reset", { arrWarnings, token });
    } else {
      return next();
    }
  },
];

// Exportar validaciones
module.exports = {
  validatorCreateUser,
  validatorLoginUser,
  validatorResetPassword,
};
