import generarjwt from "../middlewares/generarJWT.js";
import usuarios from "../models/usuarios.js";
import bcrypt from "bcryptjs";

export const CrearUsuarios = async (req, res) => {
  try {
    const { tipo, email, password } = req.body;

    if (!tipo || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tipo, email y password son requeridos" });
    }

    const usuarioExistente = await usuarios.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    if (tipo === "admin") {
      const adminExiste = await usuarios.findOne({ tipo: "admin" });
      if (adminExiste) {
        return res.status(400).json({ message: "Ya existe un usuario admin" });
      }
    }
    const saltos = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, saltos);
    req.body.password = passwordEncriptada;

    const nuevoUsuario = new usuarios(req.body);
    await nuevoUsuario.save();
    res.status(201).json({
      message:
        tipo === "admin"
          ? "Admin creado exitosamente"
          : "Usuario creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuariosList = await usuarios.find();
    res.status(200).json(usuariosList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al listar los usuarios" });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y password son requeridos" });
    }
    const usuarioEncontrado = await usuarios.findOne({ email });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    const passwordCorrecto = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    if (!passwordCorrecto) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = generarjwt(usuarioEncontrado._id);
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        email: usuarioEncontrado.email,
        tipo: usuarioEncontrado.tipo,
        id: usuarioEncontrado._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const eliminarUsuarioID = async (req, res) => {
  try {
    console.log(req.params.id);
    const usuarioBuscado = await usuarios.findById(req.params.id);

    if (!usuarioBuscado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuarioBuscado.tipo === "admin") {
      const adminCount = await usuarios.countDocuments({ tipo: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "No se puede eliminar el único usuario admin",
        });
      }
    }

    await usuarios.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

export const editarUsuarioID = async (req, res) => {
  try {
    const usuarioBuscado = await usuarios.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.password) {
      const saltos = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, saltos);
    }

    const usuarioActualizado = await usuarios.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Usuario actualizado exitosamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al editar el usuario" });
  }
};
