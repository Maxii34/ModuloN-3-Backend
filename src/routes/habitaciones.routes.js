import { Router } from 'express';
import { crearHabitacion, listarHabitaciones, editarHabitacionID } from '../controllers/habitaciones.controllers.js';

const router = Router();

router.route("/").post(crearHabitacion).get(listarHabitaciones)
router.route("/:id").put(editarHabitacionID);

export default router;