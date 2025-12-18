import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Habitacion from "../models/habitaciones.js";

const validacionHabitacion = [

  // Número de habitación (único)
  body("numero")
    .notEmpty()
    .withMessage("El número de habitación es obligatorio")
    .isInt({ min: 1, max: 500 })
    .withMessage("El número de habitación debe estar entre 1 y 500")
    .custom(async (valor, { req }) => {
      const habitacionExistente = await Habitacion.findOne({ numero: valor });

      if (!habitacionExistente) return true;

      // Permitir mismo número si es edición
      if (
        req.params?.id &&
        habitacionExistente._id.toString() === req.params.id
      ) {
        return true;
      }

      throw new Error("Ya existe una habitación con ese número");
    }),

  // Tipo
  body("tipo")
    .notEmpty()
    .withMessage("El tipo de habitación es obligatorio")
    .isIn([
      "individual",
      "doble",
      "matrimonial",
      "suite",
      "familiar",
    ])
    .withMessage(
      "El tipo debe ser uno de los siguientes: individual, doble, matrimonial, suite, familiar"
    ),

  // Precio
  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .isFloat({ min: 1, max: 200000 })
    .withMessage("El precio debe estar entre 1 y 200000"),

  // Capacidad
  body("capacidad")
    .notEmpty()
    .withMessage("La capacidad es obligatoria")
    .isInt({ min: 1, max: 10 })
    .withMessage("La capacidad debe estar entre 1 y 10 huéspedes"),

  // Piso
  body("piso")
    .notEmpty()
    .withMessage("El piso es obligatorio")
    .isInt({ min: 0, max: 15 })
    .withMessage("El piso debe estar entre 0 y 15"),

  // Metros cuadrados
  body("metros")
    .notEmpty()
    .withMessage("Los metros cuadrados son obligatorios")
    .isInt({ min: 5, max: 200 })
    .withMessage("Los metros cuadrados deben estar entre 5 y 200"),

  // Características
  body("caracteristicas")
    .notEmpty()
    .withMessage("Las características son obligatorias")
    .isLength({ min: 2, max: 80 })
    .withMessage("Las características deben tener entre 2 y 80 caracteres"),

  // Descripción
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),

  // Estado
  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn([
      "disponible",
      "ocupada",
      "reservada",
      "limpieza",
      "mantenimiento",
    ])
    .withMessage(
      "El estado debe ser: disponible, ocupada, reservada, limpieza o mantenimiento"
    ),

  // Imagen
  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg))$/i)
    .withMessage("La imagen debe ser una URL válida"),

  // Resultado final
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionHabitacion;
