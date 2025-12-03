import { Router } from 'express';
import { CrearUsuarios, listarUsuarios } from '../controllers/usuarios.controllers';

const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(CrearUsuarios).get(listarUsuarios);

export default router;