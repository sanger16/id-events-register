import { allowPasswordChange } from "./allowPasswordChange.js";
import { changePasswordTokenVerify } from "./changePasswordTokenVerify.js";
import { findUser } from "./findUser.js";
import { updateUser } from "./updateUser.js";

// Update user
const updateUserMiddleware = [findUser, updateUser];

// User details
const detailsUserMiddleware = [findUser];

// Password change View
const passwordChangeViewMiddleware = [findUser, allowPasswordChange];

// Password Change endpoint
const passwordChangeMiddleware = [changePasswordTokenVerify, findUser];

// Request password change
const requestPasswordChangeMiddleware = findUser;

export const usersMiddlewares = {
  updateUserMiddleware,
  detailsUserMiddleware,
  passwordChangeViewMiddleware,
  passwordChangeMiddleware,
  requestPasswordChangeMiddleware,
};
