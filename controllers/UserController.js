import { Usuario } from "../models/index.js";

class UsuarioController {

  constructor() {
    this.usuario = Usuario;
  }

  getUsers = async (req, res) => {
    try {
      const users = await usuario.findAll({
        attributes: ["id", "nombreUsuario"],
      });
      res.status(200).send({ success: true, message: "Todos los usuarios", data: users });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usuario.findOne({
        where: { id },
        attributes: ["id", "nombreUsuario"],
      });
      if (!user) throw new Error("No se encontró el usuario");
      res.status(200).send({ success: true, message: "Usuario encontrado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { nombreUsuario, contraseña } = req.body;

      const user = await usuario.create({ nombreUsuario, contraseña });
      if (!user) throw new Error("No se pudo crear el usuario");
      res.status(200).send({ success: true, message: "Usuario creado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombreUsuario, contraseña } = req.body;
      const user = await usuario.update(
        { nombreUsuario, contraseña },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send({ success: true, message: "Usuario modificado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usuario.destroy({
        where: { id },
      });
      res.status(200).send({ success: true, message: "Usuario eliminado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UsuarioController;
