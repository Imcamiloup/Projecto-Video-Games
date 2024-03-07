const { Videogame, Genre} = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY, RAWG_API_URL_GENRES } = process.env;
// get all genres
const getAllGenresController = async () => {
    try{
        const responseApi = await axios.get(`${RAWG_API_URL_GENRES}?key=${API_KEY}`);
        console.log(responseApi.data.results);
        const responseApiObject = responseApi.data.results.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });
        return responseApiObject;
    } catch (error) {
        throw new Error("Error getting all genres: " + error.message);
      }
}

// create genre
const createGenresController = async (genre) => {
    try{
        const response = await Genre.create({
            name: genre
        });
        return response;
    } catch (error) {
        throw new Error("Error creating genre: " + error.message);
      }
}

module.exports = {
    getAllGenresController,
    createGenresController
}