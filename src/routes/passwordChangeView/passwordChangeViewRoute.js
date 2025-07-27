import express from "express";
import { controllers } from "../../controller/index.js";
import changePasswordAuth from "../../middleware/auth/changePasswordAuth.js";
import { usersMiddlewares } from "../../middleware/usersMiddleware/index.js";

export const passwordChangeViewRouter = express.Router();

// Render EJS
passwordChangeViewRouter.get(
  "/",
  changePasswordAuth,
  usersMiddlewares.passwordChangeViewMiddleware,
  controllers.passwordChange.get
);
