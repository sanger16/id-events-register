import express from "express";
import { controllers } from "../../controller/index.js";
import { updateUserValidators } from "../../helpers/validators/updateUserValidators.js";
import { auth } from "../../middleware/auth/index.js";
import { usersMiddlewares } from "../../middleware/usersMiddleware/index.js";

export const updateUserRouter = express.Router();

// Endpoint
updateUserRouter.post(
  "/",
  auth.superAccess,
  updateUserValidators,
  usersMiddlewares.updateUserMiddleware,
  controllers.updateUser.post
);
