import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../config/env/env.js";

export default async (password) => {
  // Generate salt
  const salt = await bcrypt.genSalt(parseInt(SALT_ROUND));

  // Generate Hash
  return bcrypt
    .hash(password, salt)
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};
