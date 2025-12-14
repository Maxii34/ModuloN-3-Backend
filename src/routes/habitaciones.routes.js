import { Router } from 'express';
import { crearHabitacion, listarHabitaciones, editarHabitacionID, obtenerHabitacionID, borrarHabitacion} from '../controllers/habitaciones.controllers.js';
import validacionHabitacion from '../middlewares/validacionHabitaciones.js';

const router = Router();
router.route("/").post(validacionHabitacion,crearHabitacion).get(listarHabitaciones)
router.route("/:id").put(validacionHabitacion, editarHabitacionID).get(obtenerHabitacionID).delete(borrarHabitacion);

export default router;