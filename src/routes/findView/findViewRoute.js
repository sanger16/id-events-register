import express from "express";
import { controllers } from "../../controller/index.js";
import { auth } from "../../middleware/auth/index.js";

export const findViewRouter = express.Router();

// Render EJS
findViewRouter.get("/", auth.adminAccess, controllers.findPlate.get);
