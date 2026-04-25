import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({ mensaje: "No hay token en la petición" });
    }
    const payload = jwt.verify(token, process.env.SECRETA_JWT);
    
    // === ESTO ES PARA DEBUGEAR ===
    console.log("CONTENIDO DEL TOKEN (PAYLOAD):", payload);
    
    // Ajustamos para que capture el ID sin importar cómo se llame en el login
    req.usuario = payload.uid || payload.id || payload.Usuario || payload.usuario || payload._id;
    
    next();
  } catch (error) {
    console.log("Error en validarToken:", error);
    res.status(401).json({ mensaje: "Token no válido" });
  }
};

export default validarToken;