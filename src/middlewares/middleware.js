exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Estamos testando a variavel local';
    next();
};

//fazendo verificação e previnindo que o erro apareça para o usuario, caso de erro, será renderizado o arquivo error.ejs
//qualquer erro que ocorrer na aplicação
exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('404');//renderizando arquivo error.ejs
    }
    next()
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();//cria aleatoriamente um token() - Codigos aleatorios evitando que ataques e pessoas maliciosas consigam invadir nosso codigo base
    next();
}