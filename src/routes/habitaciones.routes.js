import { Router } from 'express';
import { crearHabitacion, listarHabitaciones } from '../controllers/habitaciones.controllers.js';

const router = Router();

router.route("/").post(crearHabitacion).get(listarHabitaciones)

export default router;