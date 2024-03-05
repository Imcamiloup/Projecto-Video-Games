
const { getAllVideoGamesController, createVideoGameController} = require('../controllers/videoGamesController');

const getAllVideoGamesHandler = async  (req, res) => {
    try{
        const responseController = await  getAllVideoGamesController();
        res.status(200).send(responseController);
    }
    catch(error){
        res.status(404).send("Not find video games");
    }
}

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

module.exports = {
    getAllVideoGamesHandler,
    createVideoGameHandler,
}
