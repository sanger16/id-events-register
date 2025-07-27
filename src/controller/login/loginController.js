import { validationResult } from "express-validator";
import db from "../../model/db/index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/auth/generateToken.js";
import { NODE_ENV } from "../../config/env/env.js";

// API to login
const loginEndpoint = async (req, res) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  // Body params
  const { username, password } = req.body;

  // Users Model
  const users = db.users;

  let data;
  try {
    data = await users.findOne({
      where: {
        username,
      },
    });

    if (!data) {
      req.flash("errors", [{ msg: "Usuario no encontrado" }]);
      return res.redirect("/inicio");
    }

    // Transformamos a JSON
    const user = data.toJSON();

    // Validate Password
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      req.flash("errors", [{ msg: "Contraseña incorrecta" }]);
      return res.redirect("/inicio");
    }

    if (!user.isActive) {
      req.flash("errors", [{ msg: "Usuario desactivado" }]);
      return res.redirect("/inicio");
    }

    // Generate token
    const token = generateToken(user);

    if (!token) {
      req.flash("errors", [
        {
          msg: "Falla en token, no fue posible iniciar sesión. Intente nuevamente.",
        },
      ]);
      return res.redirect("/login");
    }

    // Cookie options
    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    };
    req.flash("msg", ["Bienvenido"]);
    res
      .cookie("access_token", token, options)
      .cookie("username", user.username)
      .cookie("id", user.id)
      .redirect("/buscar");
  } catch (error) {
    req.flash("errors", [
      { msg: "Problemas al contactar con la base de datos" },
    ]);
    return res.redirect("/buscar");
  }
};

// Render EJS
const loginGet = (req, res) => {
  return res.render("inicio", {
    errors: req.flash("errors"),
    msg: req.flash("msg"),
  });
};

export const loginController = {
  get: loginGet,
  post: loginEndpoint,
};
