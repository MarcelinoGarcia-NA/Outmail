const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors= require("cors");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

mongoose.connect("mongodb://localhost:27017/project_email",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
});

mongoose.set("useCreateIndex",true);

module.exports = mongoose;

const server= express();
server.use(cors());
server.use(express.json());
server.use(routes);
server.use(express.urlencoded({ extended: true }));
server.listen(3333);


