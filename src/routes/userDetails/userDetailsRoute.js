import express from "express";
import { controllers } from "../../controller/index.js";
import { auth } from "../../middleware/auth/index.js";
import { userDetailsValidators } from "../../helpers/validators/userDetailsValidators.js";
import { usersMiddlewares } from "../../middleware/usersMiddleware/index.js";

export const userDetailsRouter = express.Router();

// Endpoint
userDetailsRouter.post(
  "/",
  auth.superAccess,
  userDetailsValidators,
  usersMiddlewares.detailsUserMiddleware,
  controllers.userDetails.post
);
