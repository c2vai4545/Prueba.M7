const { User, Bootcamp } = require('../models');

// Crear y guardar usuarios
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Obtener los Bootcamp de un usuario
exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Bootcamp, through: { attributes: [] } }]
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el usuario", error: error.message });
  }
};

// Obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Bootcamp, through: { attributes: [] } }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// Actualizar usuario por Id
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const [updated] = await User.update({ firstName, lastName, email }, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.json(updatedUser);
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// Eliminar un usuario por Id
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
