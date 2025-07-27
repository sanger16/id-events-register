import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connection.js";

export const Events = sequelize.define("events", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.REAL,
    allowNull: true,
  },
  plateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "plates",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  userId: {
    // Este es el usuario que hizo el registro del evento
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "locations",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
