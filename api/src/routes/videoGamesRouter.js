const { Router } = require('express');

const { getAllVideoGamesHandler, createVideoGameHandler, changeRatingVideoGameHandler, getVideoGameByIdHandler, deleteVideoGameHandler  } = require('../Handlers/videoGamesHandler');
const videoGamesRouter = Router();

videoGamesRouter.get('/', getAllVideoGamesHandler);
videoGamesRouter.get('/:id', getVideoGameByIdHandler);
videoGamesRouter.post('/', createVideoGameHandler);
videoGamesRouter.put('/:id', changeRatingVideoGameHandler);
videoGamesRouter.delete('/:id', deleteVideoGameHandler);

module.exports = videoGamesRouter;