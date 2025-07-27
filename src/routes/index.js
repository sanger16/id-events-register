import { findPlateRouter } from "./findPlate/findPlateRoute.js";
import { findViewRouter } from "./findView/findViewRoute.js";
import { inicioRouter } from "./inicio/inicioRoute.js";
import { loginRouter } from "./login/loginRoute.js";
import { logoutRouter } from "./logout/logoutRoute.js";
import { passwordChangeRouter } from "./passwordChange/passwordChangeRoute.js";
import { passwordChangeViewRouter } from "./passwordChangeView/passwordChangeViewRoute.js";
import { registerSupplyRouter } from "./registerSupply/registerSupplyRoute.js";
import { userRegisterViewRouter } from "./registerView/registerViewRoute.js";
import { requestPasswordChangeRouter } from "./requestPasswordChange/requestPasswordChangeRoute.js";
import { updateUserRouter } from "./updateUser/updateUserRoute.js";
import { userDetailsRouter } from "./userDetails/userDetailsRoute.js";
import { userRegisterRouter } from "./userRegister/userRegisterRoute.js";

export const routes = {
  loginRoute: loginRouter,
  findView: findViewRouter,
  inicio: inicioRouter,
  findPlate: findPlateRouter,
  registerSupply: registerSupplyRouter,
  userRegister: userRegisterRouter,
  userRegisterView: userRegisterViewRouter,
  userDetails: userDetailsRouter,
  updateUser: updateUserRouter,
  logout: logoutRouter,
  passwordChangeView: passwordChangeViewRouter,
  passwordChange: passwordChangeRouter,
  requestPasswordChange: requestPasswordChangeRouter,
};
