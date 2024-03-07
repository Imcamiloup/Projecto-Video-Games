
const { getAllVideoGamesController,
     getVideoGameByIdController,
        getVideoGameByNameController,
     createVideoGameController, 
     changeRatingVideoGameController
    } = require('../controllers/videoGamesController');


// Responde con todos los videojuegos
const getAllVideoGamesHandler = async  (req, res) => {
    try{
        const responseController = await  getAllVideoGamesController();
        res.status(200).send(responseController);
    }
    catch(error){
        res.status(404).send("Not find video games");
    }
}

// Responde con el videojuego que tiene el id que recibe
const getVideoGameByIdHandler = async (req, res) => {
    const { id } = req.params;
    try{
        if (!id) throw new Error("Missing data");
        const response = await getVideoGameByIdController(id);
        console.log('Response:',response);
        if (!response) throw new Error("Game not found");
        res.status(200).send(response);
    }
    catch(error){
        console.log(error);
        res.status(404).send("Not find video game:" + error.message);
    }
}

// Responde con el videojuego que tiene el nombre que recibe
const getVideoGameByNameHandler = async (req, res) => {
    const { name } = req.query;
    try{
        if (!name) throw new Error("Missing data");
        const response = await getVideoGameByNameController(name);
        if (!response) throw new Error("Game not found");
        res.status(200).send(response);
    }
    catch(error){
        res.status(404).send("Not find video game:" + error.message);
    }
}

// Recibe la query con los datos del videojuego y lo crea
const createVideoGameHandler = async (req, res) => {
    const { name, description, platforms, image, released, rating} = req.body;
    try{
        const response = await createVideoGameController(name, description, platforms, image, released, rating);
        res.status(200).send(response);
    }
    catch(error){
        res.status(404).send("Not create video game");
    }
}

// Recibe el id del videojuego y el rating y cambia el rating del videojuego
const changeRatingVideoGameHandler = async (req, res) => {
    const { rating } = req.body;
    const { id } = req.params;
    try{
        if (!id || !rating) throw new Error("Missing data");
        game = await getVideoGameByIdController(id);
        if (!game) throw new Error("Game not found");
        const response = await changeRatingVideoGameController(rating, game);
        res.status(200).send(response);
    }
    catch(error){
        res.status(402).send(error.message);
    }
}

// Recibe el id del videojuego y lo elimina
const deleteVideoGameHandler = async (req, res) => {
    const { id } = req.params;
    try{
        if (!id) throw new Error("Missing data");
        game = await getVideoGameByIdController(id);
        if (!game) throw new Error("Game not found");
        await game.destroy();
        res.status(200).send("Game deleted");
    }
    catch(error){
        res.status(402).send(error.message);
    }
}


module.exports = {
    getAllVideoGamesHandler,
    getVideoGameByIdHandler,
    getVideoGameByNameHandler,
    createVideoGameHandler,
    changeRatingVideoGameHandler,
    deleteVideoGameHandler
}
