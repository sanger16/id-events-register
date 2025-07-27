import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connection.js";

export const Locations = sequelize.define("locations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
