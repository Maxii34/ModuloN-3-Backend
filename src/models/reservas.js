import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    habitacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },
    fechaEntrada: {
      type: Date,
      required: true,
    },
    fechaSalida: {
      type: Date,
      required: true,
    },
    cantidadHuespedes: {
      type: Number,
      required: true,
      min: 1,
    },
    estado: {
      type: String,
      enum: ["activa", "cancelada", "finalizada"],
      default: "activa",
    },
  },
  { timestamps: true }
);

const Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;
