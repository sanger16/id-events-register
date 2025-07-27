// Express Validator
import { body } from "express-validator";

export const loginValidators = [
  body("username")
    .customSanitizer((values) => values.trimEnd())
    .not()
    .isEmpty()
    .withMessage("Usuario no de estar vacío")
    .isAlphanumeric()
    .withMessage("Usuario solo debe contener números y letras"),
  body("password").not().isEmpty().withMessage("Debe introducir su contraseña"),
];
