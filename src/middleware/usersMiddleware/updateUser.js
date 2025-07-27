import { validationResult } from "express-validator";
import hashing from "../../helpers/hash/hashing.js";

/**
 * Allows update user register
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateUser = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  // Body params
  const { passwordU, nameU, lastnameU, emailU, admin, active } = req.body;

  if (!res.locals.userData) {
    return next();
  }
  // User data
  const userData = res.locals.userData;

  try {
    if (!userData) {
      req.flash("errors", [{ msg: "Usuario no existe" }]);
      return res.redirect("/register");
    }

    // Hash password
    let hashedPassword;

    // When new password is received
    if (passwordU) {
      hashedPassword = await hashing(passwordU);
    }

    // Only if hashed password exists
    if (hashedPassword) {
      userData.password = hashedPassword;
    }

    // Change vales on user instance
    userData.name = nameU || "";
    userData.lastname = lastnameU || "";
    userData.email = emailU || "";

    // Set user as Admin
    if (!admin) {
      userData.isAdmin = false;
    } else {
      userData.isAdmin = true;
    }

    // Activate User
    if (!active) {
      userData.isActive = false;
    } else {
      userData.isActive = true;
    }

    // Update values on DB
    const updated = await userData.save();

    if (!updated) {
      // Finish request
      req.flash("errors", [{ msg: `No fue posible actualizar` }]);
      return res.redirect("/register");
    }
    // Finish request
    req.flash(
      "msg",
      `Usuario ${userData.dataValues.username} actualizado correctamente`
    );
  } catch (error) {
    console.error(error);
    req.flash("errors", [{ msg: `No fue posible actualizar` }]);
  }

  next();
};
