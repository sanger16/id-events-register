import { validationResult } from "express-validator";
import db from "../../model/db/index.js";

/**
 * In case the plate number does not exist it is cretaed in database
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const createPlate = async (req, res, next) => {
  // Early return if plate found
  if (res.locals.found) {
    return next();
  }

  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/buscar");
  }

  // Body params
  const { plate } = req.body;

  // plate model
  const platesModel = db.plates;

  try {
    const data = await platesModel.create({
      plate: plate.toUpperCase(),
    });

    // If register was not possible return with error
    if (!data) {
      req.flash("errors", [{ msg: "No fue posible registrar placa" }]);
      return res.redirect("/buscar");
    }

    // Get Json of plate found or created
    const plateRegistered = data.toJSON();

    // Pass plate Id
    res.locals.plateId = plateRegistered.id;

    // Set plate data to show on view
    req.flash("plate", JSON.stringify(plateRegistered));
    req.flash("msg", ["¡Placa registrada!"]);
    return res.redirect("/buscar");
  } catch (error) {
    req.flash("errors", [{ msg: "Problemas creando registro de placa" }]);
    return res.redirect("/buscar");
  }
};
