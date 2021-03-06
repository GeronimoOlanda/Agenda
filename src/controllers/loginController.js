const Login = require('../models/LoginModel');

//renderizando pagina de login
exports.index = (req, res, next) =>{
  if(req.session.user) return res.render('login-logado');
    res.render('login');
}

//criando metodo de registro
exports.register = async function(req, res){
    try{
        const login = new Login(req.body);//instancia a variavel login  utilizando async await
        await login.register();
       
        if(login.errors.length > 0){
            req.flash('errors', login.errors);//caso ocorra algum erro, sera exibido o erro em um alerta para o usuario
            req.session.save(function(){
               return res.redirect('/login/index'); //salvando a sessao e redirecionando para a pagina index do login
    
            });
            return;
        }
        
        req.flash('success', 'Seu usuario foi criado com sucesso');//se o usuario for cadastrado com sucesso, será exibida uma mensagem de bem suceddido
        req.session.save(function(){
            return res.redirect('/login/index'); 
        });
    }catch(e){
        console.log(e)
        res.render('404'); //caso contrario será exibido um erro
    }

}
exports.login = async function(req, res) {
    try {
      const login = new Login(req.body); //instanciando a variavel Global Login
      await login.login();//instanciando a mesma utilizando aync await
  
      if(login.errors.length > 0) {
        req.flash('errors', login.errors);//verificando se há algum erro
        req.session.save(function() {
          return res.redirect('/login/index');//se ocorrer algum erro retorna para a home
        });
        return;
      }
  
      req.flash('success', 'Você entrou no sistema.');//se for tudo bem retorna a mensagem de sucesso
      req.session.user = login.user;
      req.session.save(function() {
        return res.redirect('/login/index');
      });
    } catch(e){
        console.log(e)
        res.render('404')
    }

};

//fazendo o logout 
exports.logout = (req, res) => {
  req.session.destroy(); //destruindo a sessao e retornando para a pagina home
  res.redirect('/');
}
