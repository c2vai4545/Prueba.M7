const { Bootcamp, User } = require('../models');

// Crear y guardar un nuevo Bootcamp
/**
 * Crea y guarda un nuevo Bootcamp en la base de datos.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del Bootcamp.
 * @param {string} req.body.title - El título del Bootcamp.
 * @param {number} req.body.cue - La duración del Bootcamp en unidades de estudio (CUE).
 * @param {string} req.body.description - La descripción del Bootcamp.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const bootcamp = await Bootcamp.create({ title, cue, description });
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el Bootcamp", error: error.message });
  }
};

/**
 * Agrega un Usuario a un Bootcamp específico.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {string} req.params.bootcampId - El ID del Bootcamp.
 * @param {string} req.params.userId - El ID del Usuario.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
exports.addUser = async (req, res) => {
  try {
    const { bootcampId, userId } = req.params;
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);
    
    if (!bootcamp || !user) {
      return res.status(404).json({ mensaje: "Bootcamp o Usuario no encontrado" });
    }
    
    await bootcamp.addUser(user);
    res.json({ mensaje: "Usuario agregado al Bootcamp exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar Usuario al Bootcamp", error: error.message });
  }
};

/**
 * Obtiene un Bootcamp por su ID, incluyendo los Usuarios asociados.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {string} req.params.id - El ID del Bootcamp a buscar.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id, {
      include: [{ model: User, through: { attributes: [] } }]
    });
    
    if (!bootcamp) {
      return res.status(404).json({ mensaje: "Bootcamp no encontrado" });
    }
    
    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar el Bootcamp", error: error.message });
  }
};

/**
 * Obtiene todos los Bootcamps, incluyendo los Usuarios asociados a cada uno.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{ model: User, through: { attributes: [] } }]
    });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los Bootcamps", error: error.message });
  }
};
