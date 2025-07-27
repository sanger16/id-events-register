import express from "express";
import { controllers } from "../../controller/index.js";
import { loginValidators } from "../../helpers/validators/loginValidators.js";

export const loginRouter = express.Router();

// Login API
loginRouter.post("/", loginValidators, controllers.login.post);
