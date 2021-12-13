const express = require("express");
const routes = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



const UserController= require("./controllers/UserController");
const MessageController= require('./controllers/MessageController');
const AuthenticateController= require("./controllers/Authenticate");
const AuthMiddlewares= require('./middlewares/auth');


routes.post("/users",UserController.store);

/* 
routes.get("/users",UserController.list);
routes.put("/users/:id",UserController.update);
routes.delete("/users/:id",UserController.destroy);*/
routes.get("/users/:email",UserController.finduser);


routes.post("/message",MessageController.store);
/*
routes.put("/message/:id",MessageController.update);
routes.get("/message",AuthMiddlewares,MessageController.list);
routes.delete("/message/:id",MessageController.destroy);*/
routes.get("/message/:email_recipient",AuthMiddlewares,MessageController.findEmailRecipient);
routes.get("/message/sender/:email_sender",AuthMiddlewares,MessageController.findEmailSender);



routes.post("/authenticate",AuthenticateController.authenticate);
routes.use(AuthMiddlewares);




module.exports = routes;