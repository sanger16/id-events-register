import express from "express";
import { controllers } from "../../controller/index.js";
import { findPlateValidators } from "../../helpers/validators/findPlateValidators.js";
import { auth } from "../../middleware/auth/index.js";
import { plateMiddlewares } from "../../middleware/platesMiddlewares/index.js";

export const findPlateRouter = express.Router();

// Render EJS
findPlateRouter.post(
  "/",
  auth.adminAccess,
  findPlateValidators,
  plateMiddlewares.findPlateMiddlewares,
  controllers.findPlate.post
);
