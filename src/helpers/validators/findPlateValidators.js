// Express Validator
import { body } from "express-validator";

export const findPlateValidators = [
  body("plate")
    .not()
    .isEmpty()
    .withMessage("Placa no debe estar vacía")
    .customSanitizer((values) => values.trim())
    .isAlphanumeric()
    .withMessage("Placa solo debe contener números y letras"),
  body("tz")
    .optional({ checkFalsy: true })
    .customSanitizer((values) => values.trim())
    .isFloat({ min: -12, max: 14 })
    .withMessage("La zona horaria debe ser un número entre -12 y 14"),
];
