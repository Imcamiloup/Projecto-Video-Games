const { v4: uuidv4 } = require('uuid');
const { Videogame } = require('../models/Videogame');
const {Sequelize, Datatypes} = require('sequelize');


const getLocalGameById = async (id) => {

    try {
        
        const game = await Videogame.findOne({
            where: {
                id: id
            }
        });
        return game;

    } catch (error) {
        console.error('Error al obtener el juego desde la base de datos local', error);
        return { error: 'Error al obtener el juego desde la base de datos local' };
    
    }
};

module.exports = {getLocalGameById};
