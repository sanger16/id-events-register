import nodemailer from "nodemailer"
import { OUTGOING_EMAIL, OUTGOING_EMAIL_PASSWORD } from "../env/env.js"

/**
 * Define email server configuration
 */
export const emailTransporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: OUTGOING_EMAIL,
    pass: OUTGOING_EMAIL_PASSWORD,
  },
})