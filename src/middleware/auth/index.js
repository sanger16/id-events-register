import { adminAuth } from "./adminAuth.js";
import { superAuth } from "./superAuth.js";
import { userAuth } from "./userAuth.js";

// Combine user and admin permissions middlewares
const adminAccess = [userAuth, adminAuth];

// Combine  user and super permissions middlewares
const superAccess = [userAuth, superAuth];

export const auth = {
  userAuth,
  adminAccess,
  superAccess,
};
