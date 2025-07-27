import express from "express";
import { controllers } from "../../controller/index.js";
import { registerValidators } from "../../helpers/validators/registerValidators.js";
import { auth } from "../../middleware/auth/index.js";

export const userRegisterRouter = express.Router();

// Endpoint
userRegisterRouter.post(
  "/",
  auth.superAccess,
  registerValidators,
  controllers.userRegister.post
);
