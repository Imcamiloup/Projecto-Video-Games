const { Router } = require('express');

const { getAllVideoGamesHandler, createVideoGameHandler } = require('../Handlers/videoGamesHandler');
const videoGamesRouter = Router();

videoGamesRouter.get('/', getAllVideoGamesHandler);
videoGamesRouter.post('/', createVideoGameHandler);

module.exports = videoGamesRouter;