import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connection.js";

export const BlackListToken = sequelize.define("blackListToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
});
