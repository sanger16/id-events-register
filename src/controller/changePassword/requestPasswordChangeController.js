import { changePasswordEmail } from "../../helpers/email/changePasswordEmail.js";

const requestPasswordChangeEndpoint = async (req, res) => {
  // Get user instance
  const user = res.locals.userData;

  if (!user) {
    req.flash("errors", [{ msg: "Usuario no existe" }]);
    return res.redirect("/register");
  }

  // URL
  const url = req.protocol + "://" + req.get("host");

  try {
    // Send email
    const msg = await changePasswordEmail(user, url);

    // Retorna resultado de la operación
    req.flash("errors", [{ msg }]);
    return res.redirect("/register");
  } catch (error) {
    req.flash("errors", [{ msg: "No fue posible procesar la solicitud" }]);
    return res.redirect("/register");
  }
};

export const requestPasswordChange = {
  post: requestPasswordChangeEndpoint,
};
