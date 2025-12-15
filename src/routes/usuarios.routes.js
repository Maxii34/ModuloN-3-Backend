import { Router } from "express";
import {
  CrearUsuarios,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuarioID,
  editarUsuarioID,
  obtenerUsuarioID,
} from "../controllers/usuarios.controllers.js";
import validarToken from "../middlewares/validarToken.js";

const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(CrearUsuarios).get(listarUsuarios);
router.route("/login").post(iniciarSesion);
router.route("/:id")
  .delete(validarToken, eliminarUsuarioID)
  .put(validarToken, editarUsuarioID)
  .get(validarToken, obtenerUsuarioID);

export default router;
