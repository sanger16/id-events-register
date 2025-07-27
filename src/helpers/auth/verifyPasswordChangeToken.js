import jwt from "jsonwebtoken";
import { SECRET_PASSWORD_TOKEN } from "../../config/env/env.js";

/**
 * Verify token and decode
 */
export default (token) => {
  let decoded;

  if (!token) {
    throw new Error("Debe proveer token");
  }

  try {
    decoded = jwt.verify(token, SECRET_PASSWORD_TOKEN);
  } catch (error) {
    console.error(error);
    throw new Error("No pudo verificar token " + error);
  }

  return decoded;
};
