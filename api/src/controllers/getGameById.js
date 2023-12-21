const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api/games';

const getGameById = async (response, id) => {
  try {
    const res = await axios.get(`${RAWG_API_URL}/${id}`, {
      params: {
        key: API_KEY,
      },
    });

    const { name, description, platforms, background_image, released, rating } = res.data;

    if (!response.headersSent) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ id, name, description, platforms, background_image, released, rating }));
    }
  } catch (error) {
    if (!response.headersSent) {
      if (error.response) {
        response.writeHead(error.response.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: error.response.statusText }));
      } else if (error.request) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'No se recibió respuesta del servidor' }));
      } else {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Error en la configuración de la solicitud' }));
      }
    }
  }
};

module.exports = { getGameById };
