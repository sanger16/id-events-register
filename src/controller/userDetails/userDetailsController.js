import { validationResult } from "express-validator";
import db from "../../model/db/index.js";

/**
 * Permite obtener detalles de usuario
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const userDetails = async (req, res) => {
  // User data
  const userData = res.locals.userData;

  if (!userData) {
    return res.status(401);
  }
  // Transformamos a JSON
  const user = userData.toJSON();

  return res.status(200).json({ data: user });
};

export const userDetailsController = {
  post: userDetails,
};
