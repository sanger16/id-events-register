import { validationResult } from "express-validator";
import { timezoneOffset } from "../../helpers/timezone/timezoneOffset.js";
import db from "../../model/db/index.js";

/**
 * Allows to get events historical data
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const getHistory = async (req, res, next) => {
  // Express validator
  const resultErrors = validationResult(req);
  const errors = resultErrors.array();

  if (!resultErrors.isEmpty()) {
    req.flash("errors", errors);
    return res.redirect("/buscar");
  }

  // Get plate Id
  const plateId = res.locals.plateId;

  // Get timezone in case is received from client
  // Default UTC -4
  const offsetTz = req.body.tz;

  // Events model
  const eventsModel = db.events;

  try {
    // Get last 15 entries
    const { count, rows } = await eventsModel.findAndCountAll({
      where: {
        plateId: plateId,
      },
      order: [
        ["createdAt", "DESC"], // Orders by 'createdAt' column in descending order
      ],
      include: [
        {
          model: db.users,
          required: true,
        },
        {
          model: db.plates,
          required: true,
        },
      ],
      offset: 0,
      limit: 15,
    });

    // Variable to store history
    let history = [];

    // Format data history to view
    rows.forEach((row) => {
      const date = new Date(row.updatedAt);

      // Adjust date with timezone
      const localTime = new Date(
        date.setHours(date.getHours() - timezoneOffset(offsetTz))
      );
      const formattedDate = new Intl.DateTimeFormat("es-VE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(localTime);

      history.push({
        plate: row.plate.dataValues.plate,
        date: formattedDate,
        time: localTime.getHours() + ":" + localTime.getMinutes(),
        qty: row.cantidad,
        username: row.user.dataValues.username,
      });
    });

    // Pass history array
    req.flash("history", history);
  } catch (error) {
    req.flash("errors", [{ msg: "Problemas para obtener registro histórico" }]);
    return res.redirect("/buscar");
  }

  next();
};
