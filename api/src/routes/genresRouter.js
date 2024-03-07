const {Router} = require('express');
const {getAllGenresHandler, createGenresHandler} = require('../Handlers/genresHandler');

const genresRouter = Router();

genresRouter.get('/', getAllGenresHandler);
genresRouter.post('/', createGenresHandler);

module.exports = genresRouter;