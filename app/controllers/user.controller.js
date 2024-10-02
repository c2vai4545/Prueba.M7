const { User, Bootcamp } = require('../models');

/**
 * Crea y guarda un nuevo usuario en la base de datos.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del usuario.
 * @param {string} req.body.firstName - El nombre del usuario.
 * @param {string} req.body.lastName - El apellido del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

/**
 * Obtiene un usuario por su ID, incluyendo los Bootcamps asociados.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {string} req.params.id - El ID del usuario a buscar.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
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

/**
 * Obtiene todos los usuarios, incluyendo los Bootcamps asociados a cada uno.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
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

/**
 * Actualiza un usuario por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {string} req.params.id - El ID del usuario a actualizar.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos actualizados del usuario.
 * @param {string} req.body.firstName - El nombre actualizado del usuario.
 * @param {string} req.body.lastName - El apellido actualizado del usuario.
 * @param {string} req.body.email - El correo electrónico actualizado del usuario.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
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

/**
 * Elimina un usuario por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {string} req.params.id - El ID del usuario a eliminar.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
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
