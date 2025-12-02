import { Router } from 'express';
import { crearHabitacion, listarHabitaciones, editarHabitacionID, obtenerHabitacionID} from '../controllers/habitaciones.controllers.js';

const router = Router();

router.route("/").post(crearHabitacion).get(listarHabitaciones)
router.route("/:id").put(editarHabitacionID).get(obtenerHabitacionID);

export default router;