const { Router } = require("express");
const videoGamesRouter = require("./videoGamesRouter.js");

const router = Router();

router.use("/games",videoGamesRouter);



module.exports = router;
