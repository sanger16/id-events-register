import { validationResult } from "express-validator";
import db from "../../model/db/index.js";
import hashing from "../../helpers/hash/hashing.js";

/**
 * Allows update user information
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateRegister = async (req, res) => {
  return res.redirect("/register");
};

export const updateRegisterController = {
  post: updateRegister,
};
