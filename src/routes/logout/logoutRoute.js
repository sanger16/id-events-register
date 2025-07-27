import express from "express";
import { controllers } from "../../controller/index.js";
import { auth } from "../../middleware/auth/index.js";

export const logoutRouter = express.Router();

// Login API
logoutRouter.post("/", auth.userAuth, controllers.logout.post);
