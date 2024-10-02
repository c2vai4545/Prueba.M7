const { sequelize, User } = require('./app/models');
const { Bootcamp } = require('./app/models');

// Función para crear las tablas en la base de datos
async function createTables() {
  try {
    // Eliminar tablas existentes
    console.log("Executing (default): DROP TABLE IF EXISTS \"user_bootcamp\" CASCADE;");
    await sequelize.query('DROP TABLE IF EXISTS "user_bootcamp" CASCADE;');

    console.log("Executing (default): DROP TABLE IF EXISTS \"bootcamps\" CASCADE;");
    await sequelize.query('DROP TABLE IF EXISTS "bootcamps" CASCADE;');

    console.log("Executing (default): DROP TABLE IF EXISTS \"users\" CASCADE;");
    await sequelize.query('DROP TABLE IF EXISTS "users" CASCADE;');

    // Crear tabla users
    console.log("Executing (default): CREATE TABLE IF NOT EXISTS \"users\" (\"id\" SERIAL , \"firstName\" VARCHAR(255), \"lastName\" VARCHAR(255), \"email\" VARCHAR(255), \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, UNIQUE (\"email\"), PRIMARY KEY (\"id\"));");
    await sequelize.query('CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL , "firstName" VARCHAR(255), "lastName" VARCHAR(255), "email" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, UNIQUE ("email"), PRIMARY KEY ("id"));');

    console.log("Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;");
    await sequelize.query('SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = \'r\' and t.relname = \'users\' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;');

    // Crear tabla bootcamps
    console.log("Executing (default): CREATE TABLE IF NOT EXISTS \"bootcamps\" (\"id\" SERIAL , \"title\" VARCHAR(255), \"cue\" INTEGER, \"description\" VARCHAR(255), \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY (\"id\"));");
    await sequelize.query('CREATE TABLE IF NOT EXISTS "bootcamps" ("id" SERIAL , "title" VARCHAR(255), "cue" INTEGER, "description" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));');

    console.log("Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'bootcamps' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;");
    await sequelize.query('SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = \'r\' and t.relname = \'bootcamps\' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;');

    // Crear tabla user_bootcamp
    console.log("Executing (default): CREATE TABLE IF NOT EXISTS \"user_bootcamp\" (\"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"user_id\" INTEGER REFERENCES \"users\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE, \"bootcamp_id\" INTEGER REFERENCES \"bootcamps\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY (\"user_id\",\"bootcamp_id\"));");
    await sequelize.query('CREATE TABLE IF NOT EXISTS "user_bootcamp" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "bootcamp_id" INTEGER REFERENCES "bootcamps" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("user_id","bootcamp_id"));');

    console.log("Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'user_bootcamp' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;");
    await sequelize.query('SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = \'r\' and t.relname = \'user_bootcamp\' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;');

    console.log("Eliminando y resincronizando la base de datos.");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
}



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
      const bootcamp = await Bootcamp.create(bootcampData);
      console.log(">> Creado el bootcamp:", JSON.stringify(bootcamp.toJSON(), null, 1));
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
      if (created) {
        console.log(">> Se ha creado el usuario:", JSON.stringify(user.toJSON(), null, 1));
      } else {
        console.log(`Usuario ya existe: ${user.firstName}`);
      }
    }
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

// Función para agregar usuarios a los bootcamps
async function agregarUsuariosABootcamps() {
  try {
    // Bootcamp de React (id=1)
    const bootcampReact = await Bootcamp.findByPk(1);
    const mateo = await User.findByPk(1);
    const santiago = await User.findByPk(2);
    
    if (bootcampReact && mateo && santiago) {
      await bootcampReact.addUser(mateo);
      console.log("***************************");
      console.log(`Agregado el usuario id=${mateo.id} al bootcamp con id=${bootcampReact.id}`);
      console.log("***************************");
      
      await bootcampReact.addUser(santiago);
      console.log("***************************");
      console.log(`Agregado el usuario id=${santiago.id} al bootcamp con id=${bootcampReact.id}`);
      console.log("***************************");
    }

    // Bootcamp Desarrollo Web Full Stack (id=2)
    const bootcampWebFullStack = await Bootcamp.findByPk(2);
    
    if (bootcampWebFullStack && mateo) {
      await bootcampWebFullStack.addUser(mateo);
      console.log("***************************");
      console.log(`Agregado el usuario id=${mateo.id} al bootcamp con id=${bootcampWebFullStack.id}`);
      console.log("***************************");
    }

    // Bootcamp Big Data, IA & ML (id=3)
    const bootcampBigData = await Bootcamp.findByPk(3);
    const lucas = await User.findByPk(3);
    
    if (bootcampBigData && mateo && santiago && lucas) {
      await bootcampBigData.addUser(mateo);
      console.log("***************************");
      console.log(`Agregado el usuario id=${mateo.id} al bootcamp con id=${bootcampBigData.id}`);
      console.log("***************************");
      
      await bootcampBigData.addUser(santiago);
      console.log("***************************");
      console.log(`Agregado el usuario id=${santiago.id} al bootcamp con id=${bootcampBigData.id}`);
      console.log("***************************");
      
      await bootcampBigData.addUser(lucas);
      console.log("***************************");
      console.log(`Agregado el usuario id=${lucas.id} al bootcamp con id=${bootcampBigData.id}`);
      console.log("***************************");
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
