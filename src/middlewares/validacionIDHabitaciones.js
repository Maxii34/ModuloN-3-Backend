import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionID = [
    param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ObjectId válido"),
    (req, res, next) => resultadoValidacion(req, res, next)
]

export default validacionID