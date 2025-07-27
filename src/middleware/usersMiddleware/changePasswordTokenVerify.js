import { validationResult } from "express-validator";
import verifyPasswordChangeToken from "../../helpers/auth/verifyPasswordChangeToken.js";

/**
 * Verify token before allow change password
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const changePasswordTokenVerify = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/password");
  }

  // Body params
  const { token } = req.body;

  console.log("Token: ", token)

  // Decode token
  try {
    const decoded = verifyPasswordChangeToken(token);

    if (!decoded.id) {
        req.flash("errors", [
      {
        msg: "No es posible procesar solicitud de cambio de contraseña",
      },
    ]);
    return res.redirect("/password");
    }

    // Pass token decoded
    req.body.user = decoded.id;
  } catch (error) {
    req.flash("errors", [
      {
        msg: "Problemas al procesar token",
      },
    ]);
    return res.redirect("/password");
  }

  next();
};
