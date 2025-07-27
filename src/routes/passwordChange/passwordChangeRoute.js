import express from "express";
import { controllers } from "../../controller/index.js";
import { changePasswordValidators } from "../../helpers/validators/changePasswordValidators.js";
import { usersMiddlewares } from "../../middleware/usersMiddleware/index.js";

export const passwordChangeRouter = express.Router();

// Render EJS
passwordChangeRouter.post(
  "/",
  changePasswordValidators,
  usersMiddlewares.passwordChangeMiddleware,
  controllers.passwordChange.post
);
