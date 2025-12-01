import Habitacion from "../models/habitaciones.js"

export const crearHabitacion = async (req,res)=>{

    try {
        const habitacionNueva = new Habitacion(req.body)
        await habitacionNueva.save()
        res.status(201).json({mensaje:"Habitacion creada con exito"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrio un error al crear la habitacion"})
    }

}

export const listarHabitaciones = async (req,res)=>{

    try {
        const habitaciones = await Habitacion.find()
        res.status(200).json(habitaciones)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrio un error al listar las habitaciones"})
    }

}