import { Router } from "express";
import validarToken from "../middlewares/validarToken.js";
import { crearReserva, obtenerMisReservas } from "../controllers/reservas.controllers.js";

const router = Router();

router.post("/", validarToken, crearReserva);

router.get("/mias", validarToken, obtenerMisReservas);

export default router;
