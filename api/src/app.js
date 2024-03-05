const express = require("express");
const router = require("./Routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev")); //midleware get
server.use(express.json()); //midleware post
server.use(cors());

server.use(router);

server.get('/', (req, res) => {
    res.send('API is running');
  });

server.get("/ping",function(req, res){
    res.send("pong");
  });

module.exports = server;
