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
export const findPlate = async (req, res, next) => {
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
    const data = await platesModel.findOne({
      where: {
        plate: plate.toUpperCase(),
      },
    });

    if (!data) {
      // Indicates was not found
      res.locals.found = false;
      return next();
    }

    // Indicates was found
    res.locals.found = true;

    // Get Json of plate found or created
    const plateData = data.toJSON();

    // Pass plate Id
    res.locals.plateId = plateData.id;

    // Set plate data to show on view
    req.flash("plate", JSON.stringify(plateData));
  } catch (error) {
    req.flash("errors", [{ msg: "Problemas creando registro de placa" }]);
    return res.redirect("/buscar");
  }

  next();
};
