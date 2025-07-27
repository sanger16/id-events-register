import express from "express";
import { controllers } from "../../controller/index.js";
import { auth } from "../../middleware/auth/index.js";
import { usersMiddlewares } from "../../middleware/usersMiddleware/index.js";

export const requestPasswordChangeRouter = express.Router();

// Endpoint
requestPasswordChangeRouter.post(
  "/",
  auth.superAccess,
  usersMiddlewares.requestPasswordChangeMiddleware,
  controllers.requestPasswordChange.post
);
