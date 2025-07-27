import verifyPasswordChangeToken from "../../helpers/auth/verifyPasswordChangeToken.js";

/**
 * Verify token to allow change
 */
export default (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(200).json({
      msg: "Ausencia de token",
    });
  }

  // Verify token and decode
  const tokenDecoded = verifyPasswordChangeToken(token);

  if (!tokenDecoded) {
    return res.status(200).json({
      msg: "Solicitud vencida. Contacte al administrador.",
    });
  }

  // Pass id username
  req.tokenDecoded = tokenDecoded;

  // Pass token
  req.token = token;

  // Pass id in body as findUser expect
  res.locals.user = tokenDecoded.id

  next();
};
