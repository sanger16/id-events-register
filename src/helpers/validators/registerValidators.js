// Express Validator
import { body } from "express-validator";

export const registerValidators = [
  body("username")
    .customSanitizer((values) => values.trim())
    .not()
    .isEmpty()
    .withMessage("Usuario no de estar vacío")
    .isAlphanumeric()
    .withMessage("Usuario de usuario solo debe contener números y letras"),
  body("password")
    .customSanitizer((values) => values.trim())
    .not()
    .isEmpty()
    .withMessage("Debe introducir su contraseña")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 2,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Contraseña debe tener almenos 8 caracteres, 2 minúsculas, 2 mayúsculas, 1 caracter especial"
    ),
  body("email")
    .optional({ checkFalsy: true })
    .customSanitizer((values) => values.trim())
    .isEmail()
    .withMessage("Email inválido"),
  body("name")
    .optional({ checkFalsy: true })
    .isAlpha("en-US", { ignores: " " })
    .withMessage("Nombre solo debe contener letras"),
  body("lastname")
    .optional({ checkFalsy: true })
    .isAlpha("en-US", { ignores: " " })
    .withMessage("Apellido solo debe contener letras"),
];
