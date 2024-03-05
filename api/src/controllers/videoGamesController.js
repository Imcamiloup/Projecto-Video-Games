const { Videogame, Genre} = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY, RAWG_API_URL } = process.env;


// get all videogames
const getAllVideoGamesController = async () => {

    try{
        const responseDB = await Videogame.findAll(
            {
                include: [Genre],
            }
            );
            const  responseApi = await axios.get(`${RAWG_API_URL}?key=${API_KEY}`);
            const responseApiObject = responseApi.data.results.slice(1,50).map((game) => {
            return {
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms.map((platform) => platform.platform.name),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map((genre) =>( 
                    {
                        name: genre.name
                    }
                )),
            };
        });
        const response  = [...responseDB, ...responseApiObject];
        return response;
    } catch (error) {
        throw new Error("Error getting all video games: " + error.message);
      }
}

// get videogame by id
const getVideoGameByIdController = async (id) => {
    try{
        if (!id) throw new Error("Missing data");
        const game = await Videogame.findByPk(id);
        return game;
    }catch(error){
        throw new Error("Error getting video game by id: " + error.message);
    }

}

// Create a new videogame
const createVideoGameController = async (name, description, platforms, image, released, rating) => {
    try{
        if (!name || !description || !platforms || !image || !released || !rating ) throw new Error("Missing data");
        const newGame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
        });
        return newGame;
    }catch(error){
        throw new Error("Error creating video game: " + error.message);
    }

}

// Change the rating of a videogame
const changeRatingVideoGameController = async (rating, game) => {
    try{
        game.rating = rating;
        await game.save();
        return game;
    }catch(error){
        throw new Error("Error changing rating video game: " + error.message);
    }
}


module.exports = {
    getAllVideoGamesController,
    getVideoGameByIdController,
    createVideoGameController,
    changeRatingVideoGameController,
}
