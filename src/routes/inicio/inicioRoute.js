import express from "express";
import { controllers } from "../../controller/index.js";
import { userAuth } from "../../middleware/auth/userAuth.js";

export const inicioRouter = express.Router();

// Render EJS
inicioRouter.get("/", controllers.login.get);
