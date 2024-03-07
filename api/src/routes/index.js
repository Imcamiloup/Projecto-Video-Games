const { Router } = require("express");
const videoGamesRouter = require("./videoGamesRouter.js");
const genresRouter = require("./genresRouter.js");
const router = Router();

router.use("/games",videoGamesRouter);
router.use("/genres", genresRouter);


module.exports = router;
