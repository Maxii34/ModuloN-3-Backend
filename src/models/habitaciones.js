import mongoose, { Schema } from "mongoose";

const HabitacionSchema = new Schema({
    numero: { 
        type: Number, 
        required: true, 
        unique: true,
        min: 1,
        max: 1000
    },
    tipo: { 
        type: String, 
        required: true,
        enum: ['individual', 'doble', 'matrimonial', 'suite', 'familiar'],
        lowercase: true 
    },
    estado: { 
        type: String, 
        required: true,
        enum: ['disponible', 'ocupada', 'mantenimiento', 'limpieza', 'reservada'],
        default: 'disponible',
        lowercase: true 
    },
    precio: { type: Number, required: true, min: 0 },
    capacidad: { type: Number, required: true, min: 1 },
    caracteristicas: { type: String, trim: true },
    imagen: { type: String },
    piso: { type: Number, min: 0, max: 500 },
    metros: { type: Number, min: 0, max: 600 },
    
    // Este es el usuario que se ve en el panel de administrador
    usuario: {
        type: String, // Lo pasamos a String para evitar problemas de compatibilidad              
        default: null                
    },

    // --- EL CAMPO CORREGIDO ---
    fechasOcupadas: [
        {
            fechaEntrada: String,
            fechaSalida: String,
            // ¡AGREGAMOS EL USUARIO ACÁ ADENTRO!
            usuario: String 
        }
    ]

}, {
    timestamps: true
});

const Habitacion = mongoose.model("Habitacion", HabitacionSchema);
export default Habitacion;