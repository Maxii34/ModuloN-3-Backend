# 🏨 Backend — Syntax Hotel (Módulo N3)

## 📄 Descripción

Este repositorio contiene el backend del proyecto **Syntax Hotel** (Módulo N3). Es una API REST construida con **Node.js** y **Express**, que gestiona usuarios, habitaciones y autenticación mediante JWT.

## ✍️ Autores

- Santiago Andrés Robledo Garrido
- Maximiliano Ordoñez
- Mariano Juárez
- Naim Federico Paz

## 🛠️ Tecnologías utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  — Entorno de ejecución
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  — Framework web minimalista
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  — ODM para la base de datos
- ![JWT](https://img.shields.io/badge/JWT-323330?style=for-the-badge)  — Autenticación y autorización
- ![bcrypt](https://img.shields.io/badge/bcrypt-6f42c1?style=for-the-badge)  — Hashing de contraseñas
- ![dotenv](https://img.shields.io/badge/dotenv-4A4A4A?style=for-the-badge&logo=dotenv&logoColor=white) **dotenv** — Manejo de variables de entorno
- ![CORS](https://img.shields.io/badge/CORS-1E90FF?style=for-the-badge)  — Permite peticiones cross-origin
- ![express-validator](https://img.shields.io/badge/express--validator-218380?style=for-the-badge)  — Validación de solicitudes
- ![morgan](https://img.shields.io/badge/morgan-FFCA28?style=for-the-badge)  — Logger de peticiones HTTP

---

## 📁 Estructura del proyecto

```
.
├─ index.js
├─ package.json
├─ README.md
├─ vercel.json
├─ public/
│  ├─ app.js
│  └─ index.html
└─ src/
	├─ controllers/
	│  ├─ habitaciones.controllers.js
	│  └─ usuarios.controllers.js
	├─ middlewares/
	│  ├─ generarJWT.js
	│  ├─ resultadoValidacion.js
	│  ├─ validacionHabitaciones.js
	│  ├─ validacionIDHabitaciones.js
	│  └─ validarToken.js
	├─ models/
	│  ├─ habitaciones.js
	│  └─ usuarios.js
	├─ routes/
	│  ├─ habitaciones.routes.js
	│  ├─ index.routes.js
	│  └─ usuarios.routes.js
	└─ server/
		├─ config.js
		└─ dbconfig.js
```

## ▶️ Cómo ejecutar (rápido)

1. Instalar dependencias: `npm install`
2. Crear un archivo `.env` con las variables necesarias (ej.: `PORT`, `MONGO_URI`, `JWT_SECRET`).
3. Levantar en modo desarrollo: `npm run dev`

> ⚠️ Asegúrate de tener MongoDB en ejecución o una URI válida en `MONGO_URI`.

---

Si querés, puedo agregar ejemplos de endpoints o un archivo `.env.example` para que sea más fácil poner en marcha el proyecto. ✅

