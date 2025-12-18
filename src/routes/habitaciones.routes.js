import { Router } from "express";
import {
  crearHabitacion,
  listarHabitaciones,
  editarHabitacionID,
  obtenerHabitacionID,
  borrarHabitacion,
} from "../controllers/habitaciones.controllers.js";
import validacionHabitacion from "../middlewares/validacionHabitaciones.js";
import validarToken from "../middlewares/validarToken.js";
import validacionID from "../middlewares/validacionIDHabitaciones.js";



const router = Router();
router
  .route("/")
  .post([ validarToken, validacionHabitacion ], crearHabitacion)
  .get(listarHabitaciones);
router
  .route("/:id")
  .put([ validarToken, validacionID, validacionHabitacion ], editarHabitacionID)
  .get(validacionID ,obtenerHabitacionID)
  .delete([ validarToken, validacionID ], borrarHabitacion);

export default router;
