const express = require('express');
const routes = express.Router();
const paginaController = require('./src/controllers/paginaController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequired} = require('./src/middlewares/middleware');
//rotas home
routes.get('/', paginaController.index);

//rotas de login
routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);

//rotas de contato
routes.get('/contato/index',loginRequired, contatoController.index);
routes.post('/contatos/register',contatoController.register)
module.exports = routes;