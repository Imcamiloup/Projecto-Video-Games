const { Router } = require('express');

const { getAllVideoGamesHandler, 
    getVideoGameByNameHandler,
    createVideoGameHandler, 
    changeRatingVideoGameHandler, 
    getVideoGameByIdHandler, 
    deleteVideoGameHandler  } = require('../Handlers/videoGamesHandler');
const videoGamesRouter = Router();

videoGamesRouter.get('/', getAllVideoGamesHandler);
videoGamesRouter.get('/names/', getVideoGameByNameHandler);
videoGamesRouter.get('/:id', getVideoGameByIdHandler);
videoGamesRouter.post('/', createVideoGameHandler);
videoGamesRouter.put('/:id', changeRatingVideoGameHandler);
videoGamesRouter.delete('/:id', deleteVideoGameHandler);

module.exports = videoGamesRouter;