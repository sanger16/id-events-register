import { passwordChangeController } from "./changePassword/changePasswordController.js";
import { requestPasswordChange } from "./changePassword/requestPasswordChangeController.js";
import { findPlateController } from "./findPlate/findPlateController.js";
import { loginController } from "./login/loginController.js";
import { logouController } from "./logout/logoutController.js";
import { registerSupplyController } from "./registerSupply/registerSupplyController.js";
import { updateRegisterController } from "./updateRegister/updateRegisterController.js";
import { userDetailsController } from "./userDetails/userDetailsController.js";
import { userRegisterController } from "./userRegister/userRegisterController.js";

export const controllers = {
  login: loginController,
  findPlate: findPlateController,
  registerSupply: registerSupplyController,
  userRegister: userRegisterController,
  userDetails: userDetailsController,
  updateUser: updateRegisterController,
  logout: logouController,
  passwordChange: passwordChangeController,
  requestPasswordChange: requestPasswordChange
};
