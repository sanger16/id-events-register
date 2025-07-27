/**
 * Verifica que el usuario no haya cambiado la contraseña
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const allowPasswordChange = async (req, res, next) => {
  // User data instance
  const userData = res.locals.userData;

  if (!userData) {
    return res.status(200).json({
      msg: "Usuario no encontrado",
    });
  }

  const user = userData.toJSON();

  if (!user.passwordReq) {
    return res.status(200).json({
      msg: "Enlace usado. Solicite cambio de contraseña nuevamente.",
    });
  }

  next();
};
