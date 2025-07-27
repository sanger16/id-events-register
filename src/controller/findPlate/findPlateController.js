/**
 * Receive a plate number render all history of this plate in view
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const findPlateEndpoint = async (req, res) => {
  return res.redirect("/buscar");
};

// Render EJS
const findPlateGet = (req, res) => {
  return res.render("buscar", {
    errors: req.flash("errors"),
    msg: req.flash("msg"),
    plate: req.flash("plate"),
    today: req.flash("today"),
    history: req.flash("history") || [],
    id: req.userId,
  });
};

export const findPlateController = {
  get: findPlateGet,
  post: findPlateEndpoint,
};
