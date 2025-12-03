import { Router } from 'express';
import { CrearUsuarios, listarUsuarios, iniciarSesion, eliminarUsuarioID } from '../controllers/usuarios.controllers';

const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(CrearUsuarios).get(listarUsuarios);
router.route("/login").post(iniciarSesion);
router.route("/:id").delete(eliminarUsuarioID);

export default router;