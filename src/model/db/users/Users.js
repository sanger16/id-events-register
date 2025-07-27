import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connection.js";

export const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isSuper: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  passwordReq: {
    // Indica solicitud de cambio de contraseña abierta
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
