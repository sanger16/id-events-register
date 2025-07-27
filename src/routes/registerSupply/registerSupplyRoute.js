import express from "express";
import { controllers } from "../../controller/index.js";
import { auth } from "../../middleware/auth/index.js";
import { registerSupplyValidators } from "../../helpers/validators/registerSupplyValidators.js";
import { plateMiddlewares } from "../../middleware/platesMiddlewares/index.js";

export const registerSupplyRouter = express.Router();

// Endpoint
registerSupplyRouter.post(
  "/",
  auth.adminAccess,
  registerSupplyValidators,
  plateMiddlewares.registerSupplyMiddlewares,
  controllers.registerSupply.post
);
