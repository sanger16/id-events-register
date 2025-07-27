import db from "../../model/db/index.js";

/**
 *
 * @param {*} role ""
 * @returns
 */

export const adminSuperBase = (role) => {
  return async (req, res, next) => {
    const users = db.users;
    let data;

    try {
      data = await users.findByPk(req.userId);
    } catch (error) {
      req.flash("errors", [{ msg: "No fue posible verificar permisos" }]);
      return res.redirect("/inicio");
    }

    if (!data) {
      req.flash("errors", [{ msg: "Usuario no existe" }]);
      return res.redirect("/inicio");
    }

    // Convert data to JSON format
    const user = data.toJSON();

    // Si el usuario no es admin retorna a inicio
    if (!user[role]) {
      req.flash("errors", [
        { msg: "Usted no está autorizado para ver esta página" },
      ]);
      return res.redirect("/inicio");
    }

    next();
  };
};
