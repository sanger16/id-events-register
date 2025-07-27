import { validationResult } from "express-validator";
import db from "../../model/db/index.js";
import hashing from "../../helpers/hash/hashing.js";
import { passwordChangeController } from "../changePassword/changePasswordController.js";

// API to login
const userRegister = async (req, res) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/register");
  }

  // Body params
  const { username, password, name, lastname, email } = req.body;

  // Plates Model
  const users = db.users;

  // Hash password
  const hashedPassword = await hashing(password);

  if (!hashedPassword) {
    req.flash("errors", [
      { msg: "Error interno. No fue posible procesar la contraseña" },
    ]);
    return res.redirect("/register");
  }

  try {
    const userCreated = await users.create({
      username,
      password: hashedPassword,
      email: email || "",
    });

    const user = userCreated.toJSON();

    let msg = [];

    if (email !== "") {
      // Build url
      const url = req.protocol + "://" + req.get("host");

      // Envía email para cambio de contraseña
      msg.push(passwordChangeController.changePassword(userCreated, url));
    }

    // Finish request
    req.flash(
      "msg",
      msg.push(`Usuario ${user.username} registrado correctamente`)
    );
    return res.redirect("/register");
  } catch (error) {
    console.log(error);
    req.flash("errors", [
      { msg: "Error interno. No fue posible conectar con la DB" },
    ]);
    return res.redirect("/register");
  }
};

// Render EJS
const userRegisterGet = (req, res) => {
  return res.render("register", {
    errors: req.flash("errors"),
    msg: req.flash("msg"),
    users: req.users || [],
  });
};

export const userRegisterController = {
  post: userRegister,
  get: userRegisterGet,
};
