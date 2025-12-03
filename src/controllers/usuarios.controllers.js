import usuarios from "../models/usuarios.js";


export const CrearUsuarios = async (req, res) => {
  try {
    const tipo = req.body.tipo;

    const usuarioExistente = await usuarios.findOne({ email: req.body.email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    if (tipo === "admin") {
      const adminExiste = await usuarios.findOne({ tipo: "admin" });
      if (adminExiste) {
        return res.status(400).json({ message: "Ya existe un usuario admin" });
      }
    }
    //aki se agrega para hashear la contraseña

    const nuevoUsuario = new usuarios(req.body);
    await nuevoUsuario.save();
    res
      .status(201)
      .json({
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

//const editarUsuarioID = async (req, res) => {};

//const obtenerUsuarioID = async (req, res) => {};

//const eliminarUsuarioID = async (req, res) => {};

