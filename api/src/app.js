/* const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');*/
require('dotenv').config();
const express = require('express');
const { Videogame, Genre } = require('./db.js');
const axios = require('axios');
const URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;
const {getGameById} = require('./controllers/getGameById.js');

const server = express();

server.name = 'API';



// Middleware para analizar JSON y URL-encoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Endpoint de prueba
server.get('/', (req, res) => {
 // res.status(200).json({ message: 'API is running' });
  res.send('API is running');
});

// Ruta para obtener todos los videojuegos
server.get('/videogames', async (req, res) => {
  try {
    const response = await axios.get(URL);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al obtener datos de la API' });
  }
});

//  Ruta para obtener un videojuego por ID
server.get('/videogames/:idVideogame', async (req, res) => {
  // Obteniendo el ID de la URL
  const { idVideogame } = req.params;
  // Eliminando dos puntos del ID
  const id = idVideogame.replace(':', '');
  // Llamando al controlador
  await getGameById(res, id);
  //debugger;
  //console.log(id);
  //console.log(idVideogame);
});

// Agrega más rutas y controladores según sea necesario

module.exports = server;





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
