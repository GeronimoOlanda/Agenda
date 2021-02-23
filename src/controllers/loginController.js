const Login = require('../models/LoginModel');

//renderizando pagina de login
exports.index = (req, res, next) =>{
    res.render('login');
}

//criando metodo de registro
exports.register = async function(req, res){
    try{
        const login = new Login(req.body);
        await login.register();
       
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
               return res.redirect('/login/index'); 
    
            });
            return;
        }
        
        req.flash('success', 'Seu usuario foi criado com sucesso');
        req.session.save(function(){
            return res.redirect('/login/index'); 
        });
    }catch(e){
        console.log(e)
        res.render('404')
    }

}