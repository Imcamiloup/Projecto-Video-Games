//importando...
require('dotenv').config();
const { Sequelize } = require('sequelize')
const VideogameCreator = require('./models/Videogame');;
const GenreCreator = require('./models/Genre');;
const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;


//Creando la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, //configurar historial de la tabla
  native: false, 
});

//Creando los modelos
VideogameCreator(sequelize);
GenreCreator(sequelize);

//Separando los modelos en variables distintas.
const { Videogame, Genre} = sequelize.models;

//Creo la relación muchos a muchos
Genre.belongsToMany(Videogame, {through: 'videogame_genre'});
Videogame.belongsToMany(Genre, {through: 'videogame_genre'});




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
