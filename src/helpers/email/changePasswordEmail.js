
import { OUTGOING_EMAIL } from "../../config/env/env.js";
import generatePasswordChangeToken from "../auth/generatePasswordChangeToken.js";
import { sendEmail } from "./email.js";

/**
 * Send email to user email address to allow change password
 *
 * @param {*} userInstance
 * @param {*} url
 */
export const changePasswordEmail = async (userInstance, url) => {
  try {
    console.log(userInstance)
    // Get user data
    const userData = userInstance.toJSON();

    if (userData.email === "" || !userData.email) {
        return [`Usuario no tiene email configurado`];
    }

    // Genera token para identificar el email
    const token = generatePasswordChangeToken(userData);

    // Este es el mensaje en formato HTML
    const message = `<div
        style="
          font-family: Arial, sans-serif;
          padding: 20px;
          margin: 0px;
          background-color: rgb(244, 244, 244);
        "
      >
        <div
          style="
            border-radius: 8px;
            max-width: 600px;
            margin: 0px auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          "
        >
          <h2
            style="
              text-align: center;
              font-family: Arial, sans-serif;
              color: rgb(51, 51, 51);
            "
          >
            Cambio de contraseña
          </h2>
          <p
            style="
              margin: 20px 0px;
              text-align: center;
              font-family: Arial, sans-serif;
            "
          >
            Configure su contraseña a continuación (El enlace expira en 1 d&iacute;a).
          </p>
          <div
            style="
              margin: 20px 0px;
              text-align: center;
              font-family: Arial, sans-serif;
            "
          >
            <a
              href="${url}/password?email=${userData.email}&amp;token=${token}"
              style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                text-decoration: none;
                border-radius: 5px;
                font-family: Arial, sans-serif;
                background-color: #ec1d16;
                color: rgb(255, 255, 255);
              "
              target="_blank"
              >Configurar</a
            >
          </div>
          <p
            style="
              margin-top: 30px;
              font-size: 12px;
              text-align: center;
              font-family: Arial, sans-serif;
              color: rgb(153, 153, 153);
            "
          >
            Si usted no solicit&oacute; este cambio. Contacte al administrador.
          </p>
          <div class="yj6qo"></div>
          <div class="adL"></div>
        </div>
        <div class="adL"></div>
      </div>
  `;

    // Opciones para el envío de email
    const mailOptions = {
      from: OUTGOING_EMAIL,
      to: userData.email,
      subject: "Configurar contraseña",
      html: message,
    };

    // Envía email a destinatario
    return sendEmail(mailOptions)
      .then((info) => {
        userInstance.passwordReq = true;
        userInstance.save();
        return [`Email enviado correctamente`];
      })
      .catch((error) => {
        return [`No fue posible enviar email. ${error}`];
      });
  } catch (error) {
    console.error(error);
    throw new Error("Problemas al procesar datos en changePassword");
  }
};