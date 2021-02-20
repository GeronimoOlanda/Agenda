//renderizando pagina de login
exports.index = (req, res, next) =>{
    res.render('login');
}

//criando metodo de registro
exports.register = (req, res) => {
    res.send('salve');
}