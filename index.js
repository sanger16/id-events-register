"use strict";
// Modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import flash from "connect-flash/lib/flash.js";
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';

// Configuring path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed Origins
import allowedOrigins from "./src/config/cors/allowedOrigins.js";

// Env variables
import { APP_PORT, SECRET_SESSION } from "./src/config/env/env.js";

// Sequelize
import { sequelize } from "./src/config/db/connection.js";

// Routes imported
import { routes } from "./src/routes/index.js";

// Express
const app = express();

// Cookie Parser
app.use(cookieParser());

// CORS
app.use(cors(allowedOrigins));

// Parse JSON on body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statics
app.use("/", express.static(path.join(__dirname, 'src', 'public')));

// View Engine
app.set("views", path.join(__dirname, 'src', 'view'));
app.set("view engine", "ejs");

// Flash messages
app.use(flash());
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
// Views
app.use("/inicio", routes.inicio);
app.use("/buscar", routes.findView);
app.use("/register", routes.userRegisterView);
app.use("/password", routes.passwordChangeView)
// Endpoints
app.use("/login", routes.loginRoute);
app.use("/logout", routes.logout);
app.use("/findPlate", routes.findPlate);
app.use("/register-supply", routes.registerSupply);
app.use("/register-user", routes.userRegister);
app.use("/user-details", routes.userDetails);
app.use("/update-user", routes.updateUser);
app.use("/change-password", routes.passwordChange);
app.use("/request-password-change", routes.requestPasswordChange)

// Default
app.get("/", (req, res) => res.redirect("/inicio"))

let dbReady = false;

// Try DB Connection
const dbConnection = async () => {
  while (!dbReady) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ logging: false, /* force: true */ });
      console.log("Database connection has been established successfully");
      dbReady = true;
    } catch (error) {
      console.error(
        "Unable to connect to the database: ",
        error,
        "\nRetrying in 30 secconds..."
      );
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  }
};

// Start web server
const port = APP_PORT || 8001;
app.listen(port, async () => {
  console.log(`Server Running on port: ${port}`);
  console.log(new Date())
  // llama a la función que establece conextión con la DB
  dbConnection().catch(console.log);
});
