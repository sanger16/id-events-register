import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../../config/env/env.js";

/**
 * Allows to generate jwt
 *
 * @param {Object} userData json with user data
 * @returns
 */
export const generateToken = (userData) => {
  return jwt.sign(
    { username: userData.username, id: userData.id },
    SECRET_ACCESS_TOKEN,
    { expiresIn: "1D" }
  );
};
