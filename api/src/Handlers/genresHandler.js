const {getAllGenresController, createGenresController}= require('../controllers/genresController');

const getAllGenresHandler = async (req, res) => {
    try{

        const response = await getAllGenresController();
        console.log(response);
        res.status(200).send(response);
    }
    catch(error){
        res.status(404).send("Not find genres");
    }
}

const createGenresHandler = async (req, res) => {
    try{

        const genres = await getAllGenresController();
        const genresNames = genres.map((genre) => createGenresController(genre.name));
        res.status(200).send(genresNames);
    }
    catch(error){
        res.status(404).send("Not create genre");
    }
}

module.exports = {
    getAllGenresHandler,
    createGenresHandler,
}