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
    }
    catch(error){
        console.error('Error al obtener el juego desde la API', error);
        return { error: 'Error al obtener el juego desde la API' };
    }
}

  
  

module.exports = { getGameById };
