import { emailTransporter } from "../../config/mail/mail.js";

/**
 * Allows to send email
 *
 * @param {*} options
 * @returns
 */
export const sendEmail = async (options) => {
  return new Promise((resolve, reject) => {
    emailTransporter.sendMail(options, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
        reject(error);
        return;
      }
      console.log("Email sent: ", info.response);
      resolve(info);
    });
  });
};
