import { validationResult } from "express-validator";
import db from "../../model/db/index.js";

/**
 * Middleware that allows create events in db table
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const createEvent = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/buscar");
  }

  // Body params
  // id is the user id
  const { id, qty } = req.body;

  // Plate Data
  const plateId = res.locals.plateId;

  // Plates Model
  const events = db.events;

  const today = new Date();

  try {
    const eventCreated = await events.create({
      plateId: plateId,
      userId: id,
      cantidad: qty || 0,
      createdAt: today,
      updatedAt: today,
    });

    if (!eventCreated) {
      req.flash("errors", [
        { msg: "Error interno. No fue posible registrar surtido." },
      ]);
      return res.redirect("/buscar");
    }

    // Message to show in view
    req.flash("msg", ["¡Surtido registrado correctamente!"]);
  } catch (error) {
    req.flash("errors", [
      { msg: "Error interno. No fue posible registrar surtido" },
    ]);
    console.error("Register Supply events model: ", error);
    return res.redirect("/buscar");
  }

  next();
};
