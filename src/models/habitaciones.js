import mongoose, { Schema } from "mongoose";

const HabitacionSchema = new Schema({
    numero: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    nombre: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
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
    descripcion: { 
        type: String,
        minlength: 10,
        maxlength: 500 
    },
    precio: { 
        type: Number, 
        required: true,
        min: 0 
    },
    capacidad: { 
        type: Number, 
        required: true,
        min: 1 
    },
    caracteristicas: [{
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50
    }],
    imagenes: [{
        type: String,
        trim: true,
        match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
    }],
    piso: { 
        type: Number, 
        min: 0,
        max: 500
    },
    metrosCuadrados: { 
        type: Number, 
        min: 0,
        max: 600 
    }
}, {
    timestamps: true
});


const Habitacion = mongoose.model("Habitacion", HabitacionSchema);

export default Habitacion;