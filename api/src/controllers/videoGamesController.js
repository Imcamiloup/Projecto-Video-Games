const { Videogame, Genre} = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
require('dotenv').config();
const { API_KEY, RAWG_API_URL } = process.env;
console.log('API_KEY',API_KEY);
console.log('RAWG_API_URL',RAWG_API_URL);


// get all videogames
const getAllVideoGamesController = async () => {

    try{
        const responseDB = await Videogame.findAll(
            {
                include: {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    },
                },
            }
            );
            const  responseApi = await axios.get(`${RAWG_API_URL}?key=${API_KEY}`);

            const responseApiObject = responseApi.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms.map((platform) => platform.platform.name),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                Genres: game.genres.map((genre) =>( 
                    {
                        name: genre.name
                    }
                )),
            };
        });
        const response  = [...responseDB, ...responseApiObject];
        return response;
    } catch (error) {
        console.error(error)
        throw new Error("Error getting all video games: " + error.message);
      }
}

// get videogame by id
const getVideoGameByIdController = async (id) => {
    try{
        if (!id) throw new Error("Missing data");
        if (id === typeof(3)){
            const gameApi = await axios.get(`${RAWG_API_URL}/${id}?key=${API_KEY}`);
        const gameApiObject = {
            id: gameApi.data.id,
            name: gameApi.data.name,
            description: gameApi.data.description,
            platforms: gameApi.data.platforms.map((platform) => platform.platform.name),
            background_image: gameApi.data.background_image,
            released: gameApi.data.released,
            rating: gameApi.data.rating,
            genres: gameApi.data.genres.map((genre) =>( 
                {
                    name: genre.name
                }
            )),
        };
        return gameApiObject;
        }
        else{
            const gameDB = await Videogame.findByPk(id);
            console.log('gameDB',gameDB);
            return gameDB;
        }
        
        
    }catch(error){
        throw new Error("Error getting video game by id: " + error.message);
    }

}

// get videogame by name
const getVideoGameByNameController = async (name) => {
    try{
        if (!name) throw new Error("Missing data");
        const gameDB = await Videogame.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${name}%` } },
                ],
            },
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                },
            },
        });
        const gameApi = await axios.get(`${RAWG_API_URL}?key=${API_KEY}&search=${name}`);
        const gameApiObject = gameApi.data.results.map((game) => {
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
        const game = [...gameDB, ...gameApiObject]
        return game.slice(0, 15);
    }catch(error){
        throw new Error("Error getting video game by name: " + error.message);
    }
}


// Create a new videogame
const createVideoGameController = async (name, description, platforms, image, released, rating, genres) => {
    try{
        if (!name || !description || !platforms || !image || !released || !rating  || !genres) throw new Error("Missing data");
        const newGame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
        });
        newGame.addGenre(genres);
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
    getVideoGameByNameController,
    createVideoGameController,
    changeRatingVideoGameController,
}
