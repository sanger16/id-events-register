// Express Validator
import { body } from "express-validator";

export const userDetailsValidators = [
  body("user")
    .customSanitizer((values) => values.trim())
    .not()
    .isEmpty()
    .withMessage("Usuario no de estar vacío")
    .isAlphanumeric()
    .withMessage("Usuario de usuario solo debe contener números y letras"),
];
