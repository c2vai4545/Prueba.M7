const { Sequelize } = require('sequelize');
const dbConfig = require('./app/config/db.config.js');
const User = require('./app/models/user.model.js');
const Bootcamp = require('./app/models/bootcamp.model.js');

// Crear instancia de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  logging: false // Desactivar logging de SQL en la consola
});

// Autenticar la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

// Definir las relaciones entre los modelos
User.belongsToMany(Bootcamp, { through: 'UserBootcamp' });
Bootcamp.belongsToMany(User, { through: 'UserBootcamp' });

module.exports = {
  sequelize,
  User,
  Bootcamp
};
