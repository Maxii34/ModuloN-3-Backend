import Habitacion from "../models/habitaciones.js";

// 1. LISTAR (GET)
export const listarHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.status(200).json(habitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar las habitaciones" });
  }
};

// 2. CREAR (POST)
export const crearHabitacion = async (req, res) => {
  try {
    const habitacionNueva = new Habitacion({ ...req.body, fechasOcupadas: [] });
    await habitacionNueva.save();
    res.status(201).json({ mensaje: "Habitación creada con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la habitación" });
  }
};

// 3. EDITAR / RESERVAR / CANCELAR (PUT)
export const editarHabitacionID = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservaNueva, cancelarReservaId, ...datosHabitacion } = req.body;

    const habitacion = await Habitacion.findById(id);
    if (!habitacion) return res.status(404).json({ mensaje: "No encontrada" });

    // --- LÓGICA CANCELAR ---
    if (cancelarReservaId) {
      habitacion.fechasOcupadas = habitacion.fechasOcupadas.filter(
        (r) => r._id.toString() !== cancelarReservaId
      );
      if (habitacion.fechasOcupadas.length === 0) {
        habitacion.estado = "disponible";
        habitacion.usuario = null;
      }
      await habitacion.save();
      return res.status(200).json({ mensaje: "Reserva cancelada" });
    }

    // --- LÓGICA RESERVAR (Con Escudo Anti-Choque de Fechas) ---
    if (reservaNueva) {
      const usuarioID = (req.usuario?._id || req.usuario?.id || req.usuario?.uid || req.usuario)?.toString();
      
      if (!usuarioID) return res.status(401).json({ mensaje: "Usuario no identificado" });

      // Aseguramos que el array exista
      if (!habitacion.fechasOcupadas) {
        habitacion.fechasOcupadas = [];
      }

      // Convertimos a string puro y limpiamos espacios
      const entradaNueva = reservaNueva.fechaEntrada.trim();
      const salidaNueva = reservaNueva.fechaSalida.trim();

      // Buscamos si hay choque comparando strings (evita bugs de zona horaria)
      const hayChoque = habitacion.fechasOcupadas.some((reservaExistente) => {
        if (!reservaExistente.fechaEntrada || !reservaExistente.fechaSalida) return false;

        const entradaGuardada = reservaExistente.fechaEntrada.trim();
        const salidaGuardada = reservaExistente.fechaSalida.trim();

        // Fórmula infalible de choque de rangos
        return (entradaNueva < salidaGuardada) && (salidaNueva > entradaGuardada);
      });

      if (hayChoque) {
        return res.status(400).json({ 
          mensaje: "La habitación ya está ocupada en esas fechas." 
        });
      }

      // Si todo está libre, guardamos (incluyendo el ID de usuario)
      habitacion.fechasOcupadas.push({
        fechaEntrada: entradaNueva,
        fechaSalida: salidaNueva,
        usuario: usuarioID 
      });

      habitacion.estado = "reservada";
      habitacion.usuario = usuarioID; 

      await habitacion.save();
      return res.status(200).json({ mensaje: "Reserva realizada con éxito" });
    }

    // --- EDICIÓN ADMIN ---
    await Habitacion.findByIdAndUpdate(id, datosHabitacion);
    res.status(200).json({ mensaje: "Editada con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// 4. OBTENER POR ID
export const obtenerHabitacionID = async (req, res) => {
  try {
    const hab = await Habitacion.findById(req.params.id);
    res.status(200).json(hab);
  } catch (e) { res.status(500).json({ mensaje: "Error" }); }
};

// 5. BORRAR
export const borrarHabitacion = async (req, res) => {
  try {
    await Habitacion.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Eliminada" });
  } catch (e) { res.status(500).json({ mensaje: "Error" }); }
};