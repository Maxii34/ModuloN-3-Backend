import { Router } from 'express';
import habitacionesRoutes from './habitaciones.routes.js';

const router = Router();

//http://localhost:3000/api/habitaciones
router.use('/habitaciones', habitacionesRoutes);

export default router;