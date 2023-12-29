/* const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');*/
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { getGameById } = require('./controllers/getGameById.js');
const { getLocalGameById } = require('./controllers/getLocalGameById.js');
const { Videogame, Genre, conn } = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const RAWG_API_URL = 'https://api.rawg.io/api/games';
// Ahora puedes usar Videogame, Genre y conn en este archivo


const server = express();

server.name = 'API';

// Middleware para analizar JSON y URL-encoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Endpoint de prueba
server.get('/', (req, res) => {
  res.send('API is running');
});



// Ruta para obtener todos los videojuegos desde la API externa
server.get('/videogames', async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
    const videogames = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms.map((platform) => platform.platform.name),
      background_image: game.background_image,
      genres: game.genres.map((genre) => genre.name),
      rating: game.rating,
      released: game.released,
    }));
    res.send(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al obtener datos de la API' });
  }
});

/*Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
El videojuego es recibido por parámetro (ID).
Tiene que incluir los datos del género del videojuego al que está asociado.
Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.*/ 

// Ruta para obtener un videojuego por ID desde la API externa y la base de datos local
server.get('/videogames/:idVideogame', async (req, res) => {
  // Obteniendo el ID de la URL
  const { idVideogame } = req.params;
  // Eliminando dos puntos del ID
  const id = idVideogame

  try {
    // Llamando los controladores
    const apiGameData = await getGameById(res, id);
    const localGameData = await getLocalGameById(id);
  
    // Verificar cuál conjunto de datos usar
    if (apiGameData.error) {
      return res.status(200).json(localGameData);
    } else {
      return res.status(200).json(apiGameData);
    }
  } catch (error) {
    console.error('Error al obtener datos del juego:', error);
  
    if (error.dbError) {
      return res.status(error.status || 500).json({ error: 'Error en la base de datos al obtener datos del juego' });
    }
  
    return res.status(error.status || 500).json({ error: 'Error al obtener datos del juego' });
  }
  
});

module.exports = server;


//GET para obtener videojuego por name
// Nueva ruta GET | /videogames/name?="..."
//Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
//Debe poder buscarlo independientemente de mayúsculas o minúsculas.
//Si no existe el videojuego, debe mostrar un mensaje adecuado.
//Debe buscar tanto los de la API como los de la base de datos.
getGameByName = async (response,name) => {
  try {
    const res = await axios.get(`${RAWG_API_URL}`, {
      params: {
        key: API_KEY, 
      },
    });

    const { name, description, platforms, background_image, genres, released, rating } = res.data;
      
        const formattedGame = {
            name,
            description,
            platforms: platforms.map((platform) => platform.platform.name),
            background_image,
            genres: genres.map((genre) => genre.name),
            released,
            rating,
        };
  
        return formattedGame;

  } catch (error) {
    console.error('Error al obtener el juego desde la API', error);
    return { error: 'Error al obtener el juego desde la API' };
  }
}
getLocalGameByName = async (name) => {
  try {
    const dbGames = await Videogame.findAll({
      where: {
        nombre: name,
      },
      include: Genre,
    });

    if (dbGames.length > 0) {
      return dbGames;
    }
    
    return { error: 'No se encontró el juego en la base de datos' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener datos de la base de datos' };
  }
};




server.get('/videogames/name', (req, res) => {
  // Obteniendo el nombre de la URL
  const { name } = req.query;

  // Verificar que el nombre no esté vacío
  if (!name) {
    return res.status(400).json({ error: 'El nombre del juego es requerido.' });
  }

  // Llamando los controladores
  getGameByName(res, name)
    .then((apiGameData) => {
      if (apiGameData.error) {
        return getLocalGameByName(name);
      }
      return apiGameData;
    })
    .then((gameData) => {
      if (gameData.error) {
        return res.status(404).json(gameData);
      }
      return res.status(200).json(gameData);
    })
    .catch((error) => {
      console.error('Error al obtener datos del juego:', error);

      if (error.dbError) {
        return res.status(error.status || 500).json({ error: 'Error en la base de datos al obtener datos del juego' });
      }

      return res.status(error.status || 500).json({ error: 'Error al obtener datos del juego' });
    });
}
);




//POST para crear un nuevo videojuego
server.post('/videogames', async (req, res) => {
  try {
    const { nombre, descripcion, plataformas, imagen, fechaLanzamiento, rating, generos } = req.body;

    // Validar datos requeridos
    if (!nombre || !plataformas || !imagen || !fechaLanzamiento || !rating || !generos || generos.length === 0) {
      return res.status(400).json({ error: 'Todos los campos son requeridos, incluyendo al menos un género.' });
    }

    // Crear el videojuego en la base de datos
    const newGame = await Videogame.create({
      nombre,
      descripcion,
      plataformas,
      imagen,
      fechaLanzamiento,
      rating,
    });

    // Obtener o crear géneros y asociarlos al videojuego
    const genreInstances = await Promise.all(generos.map(async (genreName) => {
      const [genre] = await Genre.findOrCreate({
        where: { Nombre: genreName },
      });
      return genre;
    }));

    await newGame.addGenres(genreInstances);

    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un nuevo videojuego.' });
  }
});

//GET para obtener todos los géneros
server.get('/genres', async (req, res) => {
  try {
    const dbGenres = await Genre.findAll();

    if (dbGenres.length > 0) {
      return res.json(dbGenres);
    }

    const apiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    const apiGenres = apiResponse.data.results.map((genre) => ({
      ID: uuidv4(), // Generar un nuevo UUID
      Nombre: genre.name,
    }));

    if (apiGenres.length === 0) {
      throw new Error('La API no devolvió géneros válidos.');
    }

    await Genre.bulkCreate(apiGenres);
    res.json(apiGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los géneros.', details: error.message });
  }
});



/* server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); */

// Error catching endware.
/*server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});*/

module.exports = server;
