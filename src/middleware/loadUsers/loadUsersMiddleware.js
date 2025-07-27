import db from "../../model/db/index.js";

export const loadUsers = async (req, res, next) => {
  const usersModel = db.users;

  try {
    const usersData = await usersModel.findAll({
      attributes: ["id", "username"],
    });

    if (!usersData) {
      next();
    }

    const users = usersData;

    req["users"] = users;

    next();
  } catch (error) {
    console.error("Problemas al contactar con la DB, table Users.");
    next();
  }
};
