import { Op } from "sequelize";
import { timezoneOffset } from "../../helpers/timezone/timezoneOffset.js";
import db from "../../model/db/index.js";
import { validationResult } from "express-validator";

/**
 * Allows to verify if there is events today
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const checkEventsToday = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/buscar");
  }

  // Get plate Id
  const plateId = res.locals.plateId;

  // Import model
  const eventsModel = db.events;

  // Get timezone in case is received from client
  const offsetTz = req.body.tz;

  // Current date and time
  let todayStartDay = new Date();

  // Get Sistem offset
  // Fix time offset by timezone
  // First put the date in client timezone
  todayStartDay.setHours(todayStartDay.getHours() - timezoneOffset(offsetTz));
  // Next put the time at the first moment of the day
  todayStartDay.setHours(timezoneOffset(offsetTz), 0, 0, 0);

  try {
    const eventsToday = await eventsModel.findAll({
      where: {
        plateId: plateId,
        updatedAt: {
          [Op.gte]: todayStartDay,
        },
      },
    });

    // This should never occurs since the las middleware
    if (!eventsToday) {
      req.flash("errors", [{ msg: "No existe histórico para esta placa" }]);
      // Indicate no events today
      req.flash("today", false);
      return res.redirect("/buscar");
    }

    // Allows to hide button in view
    req.flash("today", eventsToday.length > 0);
  } catch (error) {
    console.error(error);
    req.flash("errors", [{ msg: "Problemas obteniendo registro de eventos" }]);
    return res.redirect("/buscar");
  }

  next();
};
