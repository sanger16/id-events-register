import { TIMEZONE } from "../../config/env/env.js";

/**
 * Allows to generate proper timeoffset based on server time and client time
 *
 * @param {*} offset Time offset from client request
 * @returns offset to use in application
 */
export const timezoneOffset = (offset) => {
  const systemOffset = new Date().getTimezoneOffset() / 60;
  const appOffset = offset || TIMEZONE;
console.error("System vs app offset", systemOffset, appOffset)
  return Math.abs(systemOffset - appOffset);
};
