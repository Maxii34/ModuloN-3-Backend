import Reserva from "../models/reservas.js";
import mongoose from "mongoose";

export const crearReserva = async (req, res) => {
  try {
    console.log("REQ.USUARIO:", req.usuario);

    const { habitacion, fechaEntrada, fechaSalida, cantidadHuespedes } = req.body;

    if (!habitacion || !fechaEntrada || !fechaSalida || !cantidadHuespedes) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const ingreso = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    if (salida <= ingreso) {
      return res.status(400).json({ 
        mensaje: "La fecha de salida debe ser posterior a la fecha de entrada" 
      });
    }

    const reservaExistente = await Reserva.findOne({
      habitacion: habitacion,
      $and: [
        { fechaEntrada: { $lt: salida } }, 
        { fechaSalida: { $gt: ingreso } }  
      ]
    });

    if (reservaExistente) {
      return res.status(400).json({
        mensaje: "La habitación no está disponible en las fechas seleccionadas. Por favor, elige otras."
      });
    }

    const nuevaReserva = new Reserva({
      usuario: new mongoose.Types.ObjectId(req.usuario),
      habitacion,
      fechaEntrada,
      fechaSalida,
      cantidadHuespedes,
    });

    await nuevaReserva.save();

    res.status(201).json({
      mensaje: "Reserva creada correctamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
};

export const obtenerMisReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({
      usuario: new mongoose.Types.ObjectId(req.usuario),
    })
      .populate("habitacion")
      .sort({ createdAt: -1 });

    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las reservas" });
  }
};