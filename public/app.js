// URL base de la API
const API_URL = '/api/habitaciones';

// Referencias a elementos del DOM
const form = document.getElementById('formHabitacion');
const btnSubmit = document.getElementById('btnSubmit');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const mensajeExito = document.getElementById('mensaje-exito');
const mensajeError = document.getElementById('mensaje-error');

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    mensajeError.style.display = 'none';
    mensajeExito.style.display = 'none';
}

// Función para mostrar errores de validación
function mostrarErrores(errores) {
    limpiarErrores();
    
    if (Array.isArray(errores)) {
        errores.forEach(error => {
            const campo = error.path || error.param;
            const mensaje = error.msg || error.message;
            const errorElement = document.getElementById(`error-${campo}`);
            
            if (errorElement) {
                errorElement.textContent = mensaje;
                errorElement.style.display = 'block';
                
                // Resaltar el campo con error
                const inputElement = document.getElementById(campo);
                if (inputElement) {
                    inputElement.classList.add('error');
                }
            }
        });
    }
}

// Función para mostrar mensaje de éxito
function mostrarExito(mensaje) {
    limpiarErrores();
    mensajeExito.textContent = mensaje;
    mensajeExito.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        mensajeExito.style.display = 'none';
    }, 5000);
}

// Función para mostrar mensaje de error general
function mostrarErrorGeneral(mensaje) {
    limpiarErrores();
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
}

// Función para cambiar el estado del botón durante el envío
function cambiarEstadoBoton(loading) {
    if (loading) {
        btnSubmit.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        btnSubmit.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Función para remover clases de error cuando el usuario empieza a escribir
function agregarListenersInputs() {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorElement = document.getElementById(`error-${input.name || input.id}`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
}

// Función para preparar los datos del formulario
function prepararDatos() {
    const formData = new FormData(form);
    const datos = {};
    
    // Convertir número y precio a números
    datos.numero = parseInt(formData.get('numero'));
    datos.precio = parseFloat(formData.get('precio'));
    datos.capacidad = parseInt(formData.get('capacidad'));
    datos.piso = parseInt(formData.get('piso'));
    datos.metros = parseInt(formData.get('metros'));
    
    // Campos de texto
    datos.tipo = formData.get('tipo');
    datos.estado = formData.get('estado');
    datos.caracteristicas = formData.get('caracteristicas');
    datos.descripcion = formData.get('descripcion');
    datos.imagen = formData.get('imagen');
    
    return datos;
}

// Función para enviar la petición al backend
async function crearHabitacion(datos) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();

        if (!response.ok) {
            // Si hay errores de validación
            if (response.status === 400 && Array.isArray(resultado)) {
                mostrarErrores(resultado);
                throw new Error('Errores de validación');
            }
            // Si hay otro tipo de error
            throw new Error(resultado.mensaje || 'Error al crear la habitación');
        }

        // Éxito
        mostrarExito(resultado.mensaje || 'Habitación creada con éxito');
        form.reset();
        
        return resultado;
    } catch (error) {
        console.error('Error:', error);
        if (error.message !== 'Errores de validación') {
            mostrarErrorGeneral(error.message || 'Ocurrió un error al crear la habitación');
        }
        throw error;
    }
}

// Event listener para el envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    limpiarErrores();
    cambiarEstadoBoton(true);
    
    try {
        const datos = prepararDatos();
        await crearHabitacion(datos);
    } catch (error) {
        // Los errores ya se manejan en crearHabitacion
        console.error('Error al procesar el formulario:', error);
    } finally {
        cambiarEstadoBoton(false);
    }
});

// Agregar listeners para limpiar errores cuando el usuario escribe
agregarListenersInputs();

// Limpiar mensajes cuando se resetea el formulario
form.addEventListener('reset', () => {
    limpiarErrores();
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
});
