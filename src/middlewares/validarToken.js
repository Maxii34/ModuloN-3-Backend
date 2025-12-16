import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({ mensaje: "No hay token en la petición" });
    }
    const payload = jwt.verify(token, process.env.SECRETA_JWT);
    req.usuario = payload.Usuario || payload.usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ mensaje: "Token no válido" });
  }
};

export default validarToken;