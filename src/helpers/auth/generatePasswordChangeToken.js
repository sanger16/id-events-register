import jwt from "jsonwebtoken";
import { SECRET_PASSWORD_TOKEN } from "../../config/env/env.js";

/**
 * Allows to generate jwt
 *
 * @param {Object} userData json with user data
 * @returns
 */
export default (userData) => {
  return jwt.sign(
    { username: userData.username, id: userData.id },
    SECRET_PASSWORD_TOKEN,
    { expiresIn: "1D" }
  );
};
