const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api/games';

const getGameById = async (response, idVideogame) => {
    try {
      const res = await axios.get(`${RAWG_API_URL}/${idVideogame}`, {
        params: {
          key: API_KEY,
        },
      });
  
      const { name, description, platforms, background_image, released, rating } = res.data;
  
      if (!response.headersSent) {
        response.status(200).json({
          id: idVideogame,
          name,
          description,
          platforms: platforms.map(platform => platform.platform.name),
          background_image,
          released,
          rating,
        });
      }
    } catch (error) {
      if (!response.headersSent) {
        if (error.response) {
          response.status(error.response.status).json({ error: error.response.statusText });
        } else if (error.request) {
          response.status(500).json({ error: 'No se recibió respuesta del servidor' });
        } else {
          response.status(500).json({ error: 'Error en la configuración de la solicitud' });
        }
      }
    }
  };
  
module.exports = { getGameById };
