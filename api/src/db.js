require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const VideogameCreator = require('./models/Videogame');
const GenreCreator = require('./models/Genre');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Creando la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false,
  native: false,
});

// Creando los modelos
VideogameCreator(sequelize);
GenreCreator(sequelize);

// Separando los modelos en variables distintas.
const { Videogame, Genre} = sequelize.models;

// Creo la relación muchos a muchos
Genre.belongsToMany(Videogame, { through: 'videogame_genres', foreignKey: 'GenreID' });
Videogame.belongsToMany(Genre, { through: 'videogame_genres', foreignKey: 'VideogameId' });

// Sincroniza el modelo con la base de datos
sequelize.sync({ force: false})
  .then(() => {
    console.log('Modelo sincronizado correctamente.');

    // Registro de prueba
    /*const newGame = {
      nombre: 'Super Mario Bros',
      descripcion: 'Juego de plataformas',
      plataformas: 'NES',
      imagen: 'https://www.mobygames.com/images/covers/l/10624-super-mario-bros-nes-front-cover.jpg',
      fechaLanzamiento: new Date('1985-09-13'),
      rating: 4.5,
    };

    Videogame.create(newGame)
      .then((game) => {
        console.log('Juego creado:', game.toJSON());

        // Consulta de prueba
        Videogame.findAll()
          .then((games) => {
            console.log('Juegos encontrados:', games);
          })
          .catch((error) => {
            console.error('Error al realizar la consulta de prueba:', error);
          });
      })
      .catch((err) => console.log('Error al crear el juego:', err));*/
  })
  .catch((err) => {
    console.log('Error al sincronizar el modelo:');
  });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Videogame, Genre,
};
