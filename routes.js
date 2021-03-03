const express = require('express');
const routes = express.Router();
const paginaController = require('./src/controllers/paginaController');
const loginController = require('./src/controllers/loginController');

//rotas home
routes.get('/',paginaController.index);

//rotas de login
routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout)
module.exports = routes;