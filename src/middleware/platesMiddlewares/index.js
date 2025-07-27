import { checkEventsToday } from "./checkEventsToday.js";
import { createEvent } from "./createEvent.js";
import { createPlate } from "./createPlate.js";
import { findPlateByPk } from "./findPlateByPk.js";
import { findPlate } from "./findPlate.js";
import { getHistory } from "./getHistory.js";

// Middlewares to find plate
const findPlateMiddlewares = [
  findPlate,
  createPlate,
  checkEventsToday,
  getHistory,
];

// Middlewares to Register Supply
const registerSupplyMiddlewares = [
  findPlateByPk,
  createEvent,
  checkEventsToday,
  getHistory,
];

export const plateMiddlewares = {
  findPlateMiddlewares,
  registerSupplyMiddlewares,
};
