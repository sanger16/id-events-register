// Express Validator
import { body } from "express-validator";

export const changePasswordValidators = [
  body("password")
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
  body("token")
    .not()
    .isEmpty()
    .withMessage("Token no debe estar vacío"),
];
