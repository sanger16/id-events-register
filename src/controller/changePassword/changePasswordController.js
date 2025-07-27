import { validationResult } from "express-validator";
import hashing from "../../helpers/hash/hashing.js";

/**
 * Procesa el cambio de contraseña deseada
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const changePasswordEndpoint = async (req, res) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/password");
  }

  // Body params
  const { password } = req.body;

  // User instance
  const userData = res.locals.userData;

  try {
    const hashedPassword = await hashing(password);

    if (!hashedPassword) {
      req.flash("errors", [
        { msg: "Error interno. No fue posible procesar la contraseña" },
      ]);
      return res.redirect("/password");
    }

    // Save password
    userData.password = hashedPassword;
    userData.passwordReq = false;

    // Save changes
    userData
      .save()
      .then(() => {
        req.flash("msg", "Contraseña configurada correctamente");
        return res.redirect("/inicio");
      })
      .catch((error) => {
        req.flash("errors", [
          { msg: "No fue posible configurar su contraseña" },
        ]);
        return res.redirect("/password");
      });
  } catch (error) {
    req.flash("errors", [
      { msg: "Error interno. No fue posible almacenar la contraseña" },
    ]);
    return res.redirect("/password");
  }
};

/**
 * Renderiza la página de cambio de contraseña
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const changePasswordRender = async (req, res) => {
  // En caso de token válido render password
  return res.render("password", {
    errors: req.flash("errors"),
    msg: req.flash("msg"),
    username: req.tokenDecoded.username,
    id: req.tokenDecoded.id,
    token: req.token,
  });
};

export const passwordChangeController = {
  get: changePasswordRender,
  post: changePasswordEndpoint,
};
