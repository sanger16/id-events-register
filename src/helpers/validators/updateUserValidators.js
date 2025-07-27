// Express Validator
import { body } from "express-validator";

export const updateUserValidators = [
  body("passwordU")
    .optional({ checkFalsy: true })
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
  body("emailU")
    .optional({ checkFalsy: true })
    .customSanitizer((values) => values.trim())
    .isEmail()
    .withMessage("Email inválido"),
  body("nameU")
    .optional({ checkFalsy: true })
    .isAlpha("en-US", { ignores: " " })
    .withMessage("Nombre solo debe contener letras"),
  body("lastnameU")
    .optional({ checkFalsy: true })
    .isAlpha("en-US", { ignores: " " })
    .withMessage("Apellido solo debe contener letras"),
];
