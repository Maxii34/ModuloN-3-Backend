import { Router } from "express";
import {
  CrearUsuarios,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuarioID,
  editarUsuarioID,
  obtenerUsuarioID,
} from "../controllers/usuarios.controllers.js";

const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(CrearUsuarios).get(listarUsuarios);
router.route("/login").post(iniciarSesion);
router.route("/:id")
  .delete(eliminarUsuarioID)
  .put(editarUsuarioID)
  .get(obtenerUsuarioID);

export default router;
