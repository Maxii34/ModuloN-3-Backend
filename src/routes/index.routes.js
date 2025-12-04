import { Router } from 'express';
import habitacionesRoutes from './habitaciones.routes.js';
import usuariosRoutes from './usuarios.routes.js';

const router = Router();

//http://localhost:3000/api/habitaciones
router.use('/habitaciones', habitacionesRoutes);
//http://localhost:3000/api/usuarios
router.use('/usuarios', usuariosRoutes);

export default router;