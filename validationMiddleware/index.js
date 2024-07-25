const express = require('express');
const fs = require("fs");
const validateRequestBody = require('./src/validator');



let server = express();


server.use(express.json());

server.post('/', validateRequestBody, (req, res) => {

    res.status(200).json("data received");

});



server.listen(3000, console.log("serverr started"))