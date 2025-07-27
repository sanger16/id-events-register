import verifyToken from "../../helpers/auth/verifyToken.js";
import db from "../../model/db/index.js";

/**
 * Allows authorize users to get in to protected route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const userAuth = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.flash("errors", [{ msg: "Por favor incie sesión" }]);
    return res.redirect("/inicio");
  }

  // Black List
  const blt = db.blackListToken;
  let tokenFound;
  try {
    // Verify if there is an entry in black list table
    tokenFound = await blt.findOne({
      where: {
        token,
      },
    });
  } catch (error) {
    req.flash("errors", [{ msg: "No fue posible verificar el token" }]);
    res
      .clearCookie("access_token")
      .clearCookie("username")
      .clearCookie("id");
    return res.redirect("/inicio");
  }

  if (tokenFound) {
    req.flash("errors", [{ msg: "No fue posible verificar el token" }]);
    res
      .clearCookie("access_token")
      .clearCookie("username")
      .clearCookie("id");
    return res.redirect("/inicio");
  }

  let decode;

  try {
    // Verify token and decode
    decode = verifyToken(token);
  } catch (error) {
    req.flash("errors", [{ msg: "No fue posible verificar el token" }]);
    res
      .clearCookie("access_token")
      .clearCookie("username")
      .clearCookie("id");
    return res.redirect("/inicio");
  }

  if (!decode) {
    eq.flash("errors", [{ msg: "No fue posible verificar el token" }]);
    res
      .clearCookie("access_token")
      .clearCookie("username")
      .clearCookie("id");
    return res.redirect("/inicio");
  }

  // Pass decode data to next logic
  req.userId = decode.id;
  req.username = decode.username;

  next();
};
