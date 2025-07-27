import express from "express";
import { controllers } from "../../controller/index.js";
import { loadUsers } from "../../middleware/loadUsers/loadUsersMiddleware.js";
import { auth } from "../../middleware/auth/index.js";

export const userRegisterViewRouter = express.Router();

// Renger EJS
userRegisterViewRouter.get(
  "/",
  auth.superAccess,
  loadUsers,
  controllers.userRegister.get
);
