import db from "../../model/db/index.js";

/**
 * Allows to logout adding token to black list table an deleting cookies
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const logoutEndpoint = async (req, res) => {
  // Request
  const token = req.cookies.access_token;

  // Black List Token Model
  const blt = db.blackListToken;

  try {
    const insertedToken = await blt.create({
      token,
    });
    if (!insertedToken) {
      req.flash("errors", [{ msg: "No fue posible invalidar token" }]);
      return res.redirect("/buscar");
    }

    // Borrar cookies
    req.flash("msg", ["Sesión cerrada exitosamente"]);
    res
      .clearCookie("access_token")
      .clearCookie("username")
      .clearCookie("id")
      .redirect("/inicio");
  } catch (error) {
    req.flash("errors", [{ msg: "Problemas al cerrar sesión" }]);
    return res.redirect("/buscar");
  }
};

export const logouController = {
  post: logoutEndpoint,
};
