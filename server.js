const { sequelize, User } = require('./app/models');
const { Bootcamp } = require('./app/models');

// Función para crear los bootcamps
async function createBootcamps() {
  const bootcamps = [
    {
      title: "Introduciendo El Bootcamp De React",
      cue: 10,
      description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
    },
    {
      title: "Bootcamp Desarrollo Web Full Stack",
      cue: 12,
      description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
    },
    {
      title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
      cue: 18,
      description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
    }
  ];

  try {
    for (const bootcampData of bootcamps) {
      const [bootcamp, created] = await Bootcamp.findOrCreate({
        where: { title: bootcampData.title },
        defaults: bootcampData
      });
      console.log(created ? `Bootcamp creado: ${bootcamp.title}` : `Bootcamp ya existe: ${bootcamp.title}`);
    }
  } catch (error) {
    console.error("Error al crear bootcamps:", error);
  }
}

// Función para crear los usuarios
async function createUsers() {
  const users = [
    { firstName: "Mateo", lastName: "Díaz", email: "mateo.diaz@correo.com" },
    { firstName: "Santiago", lastName: "Mejías", email: "santiago.mejias@correo.com" },
    { firstName: "Lucas", lastName: "Rojas", email: "lucas.rojas@correo.com" },
    { firstName: "Facundo", lastName: "Fernandez", email: "facundo.fernandez@correo.com" }
  ];

  try {
    for (const userData of users) {
      const [user, created] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: userData
      });
      console.log(created ? `Usuario creado: ${user.firstName}` : `Usuario ya existe: ${user.firstName}`);
    }
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

// Función para agregar usuarios a los bootcamps
async function agregarUsuariosABootcamps() {
  try {
    // Bootcamp de React
    const bootcampReact = await Bootcamp.findOne({ where: { title: "Introducción al Bootcamp de React" } });
    const mateo = await User.findOne({ where: { firstName: "Mateo", lastName: "Díaz" } });
    const santiago = await User.findOne({ where: { firstName: "Santiago", lastName: "Mejías" } });
    
    if (bootcampReact && mateo && santiago) {
      await bootcampReact.addUsers([mateo, santiago]);
      console.log("Usuarios agregados al Bootcamp de React");
    }

    // Bootcamp Desarrollo Web Full Stack
    const bootcampWebFullStack = await Bootcamp.findOne({ where: { title: "Bootcamp Desarrollo Web Full Stack" } });
    
    if (bootcampWebFullStack && mateo) {
      await bootcampWebFullStack.addUser(mateo);
      console.log("Usuario agregado al Bootcamp Desarrollo Web Full Stack");
    }

    // Bootcamp Big Data, IA & ML
    const bootcampBigData = await Bootcamp.findOne({ where: { title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning" } });
    const lucas = await User.findOne({ where: { firstName: "Lucas", lastName: "Rojas" } });
    
    if (bootcampBigData && mateo && santiago && lucas) {
      await bootcampBigData.addUsers([mateo, santiago, lucas]);
      console.log("Usuarios agregados al Bootcamp Big Data, IA & ML");
    }
  } catch (error) {
    console.error("Error al agregar usuarios a los bootcamps:", error);
  }
}

// Función para realizar consultas
async function realizarConsultas() {
  try {
    // Consultar Bootcamp por id, incluyendo los usuarios
    const bootcampPorId = await Bootcamp.findByPk(1, { include: User });
    console.log("Bootcamp por ID con usuarios:", bootcampPorId.toJSON());

    // Listar todos los Bootcamps con sus usuarios
    const todosLosBootcamps = await Bootcamp.findAll({ include: User });
    console.log("Todos los Bootcamps con usuarios:", JSON.stringify(todosLosBootcamps, null, 2));

    // Consultar un usuario por id, incluyendo los Bootcamps
    const usuarioPorId = await User.findByPk(1, { include: Bootcamp });
    console.log("Usuario por ID con Bootcamps:", usuarioPorId.toJSON());

    // Listar los usuarios con sus Bootcamps
    const todosLosUsuarios = await User.findAll({ include: Bootcamp });
    console.log("Todos los usuarios con Bootcamps:", JSON.stringify(todosLosUsuarios, null, 2));

    // Actualizar el usuario según su id
    const usuarioActualizado = await User.update(
      { firstName: "Pedro", lastName: "Sánchez" },
      { where: { id: 1 } }
    );
    console.log("Usuario actualizado:", usuarioActualizado);

    // Eliminar un usuario por id
    const usuarioEliminado = await User.destroy({ where: { id: 1 } });
    console.log("Usuario eliminado:", usuarioEliminado);
  } catch (error) {
    console.error("Error al realizar consultas:", error);
  }
}


// Función principal
async function main() {
  try {
    // Espera a que la conexión se establezca
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    // Crear los usuarios
    await createUsers();

    // Crear los bootcamps
    await createBootcamps();

    // Agregar usuarios a los bootcamps
    await agregarUsuariosABootcamps();

    // Realizar consultas
    await realizarConsultas();

    // Cerrar la conexión
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
  } catch (error) {
    console.error('Error en la ejecución del script:', error);
  }
}

// Ejecutar la función principal
main();
