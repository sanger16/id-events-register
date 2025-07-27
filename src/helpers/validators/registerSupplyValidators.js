// Express Validator
import { body } from "express-validator";

export const registerSupplyValidators = [
  body("id")
    .not()
    .isEmpty()
    .withMessage("Se ha detectado modificación de la solicitud")
    .customSanitizer((values) => values.trim())
    .isNumeric()
    .withMessage("Identificador de placa no puede ser diferente a un número"),
  body("plateId")
    .not()
    .isEmpty()
    .withMessage("Identificador de placa no debe estar vacío")
    .customSanitizer((values) => values.trim())
    .isNumeric()
    .withMessage("Identificador de placa incorrecto"),
  body("qty")
    .optional({ checkFalsy: true })
    .customSanitizer((values) => values.trim())
    .isNumeric()
    .withMessage("La cantidad debe ser un número"),
  body("tz")
    .optional({ checkFalsy: true })
    .customSanitizer((values) => values.trim())
    .isFloat({ min: -12, max: 14 })
    .withMessage("La zona horaria debe ser un número entre -12 y 14"),
];
