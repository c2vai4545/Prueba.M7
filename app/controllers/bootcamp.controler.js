const { Bootcamp, User } = require('../models');

// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const bootcamp = await Bootcamp.create({ title, cue, description });
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el Bootcamp", error: error.message });
  }
};

// Agregar un Usuario al Bootcamp
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

// Obtener los Bootcamp por id
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

// Obtener todos los Usuarios incluyendo los Bootcamp
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
