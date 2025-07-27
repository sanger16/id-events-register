import { validationResult } from "express-validator";
import db from "../../model/db/index.js";

/**
 * Middleware to allows find user by primary key
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const findPlateByPk = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/buscar");
  }

  // Body params
  const { plateId } = req.body;

  // Model
  const platesModel = db.plates;

  try {
    // Allows to verify that plate id receive really exists
    const data = await platesModel.findByPk(plateId);

    if (!data) {
      req.flash("errors", [{ mag: "Placa no existe" }]);
      return res.redirect("/buscar");
    }

    // Get object with plate data
    const plateData = data.toJSON();

    // Pass plate data to next
    res.locals.plateId = plateData.id;

    // Set plate data to show on view
    req.flash("plate", JSON.stringify(plateData));
  } catch (error) {
    console.error(error);
    req.flash("errors", [{ msg: "No fue posible procesar la operación" }]);
    return res.redirect("/buscar");
  }

  next();
};
