import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connection.js";

export const Plates = sequelize.define("plates", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  plate: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(50),
  },
});
