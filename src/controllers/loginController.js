const Login = require('../models/LoginModel');

//renderizando pagina de login
exports.index = (req, res, next) =>{
    res.render('login');
}

//criando metodo de registro
exports.register = (req, res) => {
    const login = new Login(req.body);
    res.send(req.body);
}