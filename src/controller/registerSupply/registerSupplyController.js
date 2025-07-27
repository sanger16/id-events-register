/**
 * Register supply
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const registerSupply = async (req, res) => {
  return res.redirect("/buscar");
};

export const registerSupplyController = {
  post: registerSupply,
};
