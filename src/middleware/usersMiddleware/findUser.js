import { validationResult } from "express-validator";
import db from "../../model/db/index.js";

/**
 * Allows find user
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const findUser = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  // Body params
  // user is the user id
  const { user } = req.body || res.locals;

  // Users Model
  const users = db.users;

  try {
    const data = await users.findOne({
      where: {
        id: user,
      },
    });

    // Pass user instance
    res.locals.userData = data;
  } catch (error) {
    console.error(error);
  }

  next();
};
