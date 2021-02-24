const mongoose = require('mongoose'); //pacote do mongoose para conexao com o bd e criação das tabelas
const validator = require('validator'); //pacote do validator para a validação dos campos email e password
const bcrypyjs = require('bcryptjs'); //pacote utilizado para fazer encptografar a senha

//trabalhando com esquemas(regras de negocios)
//estamos fazendo do jeito que queremos que esteja na base de dados
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
    
    
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;

    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

           await this.userExists();

        const salt = bcrypyjs.genSaltSync();//gerando um salt
        this.body.password = bcrypyjs.hashSync(this.body.password, salt);//e fazendo o hash da senha
        this.user = await LoginModel.create(this.body);
}

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email});
        if(user) this.errors.push('Usuario já Existe');
    }

    //validacao dos dados
    valida(){
        this.cleanUp();

        //validacão
        //O E-mail precisa ser valido
        if(!validator.isEmail(this.body.email)){ 
            this.errors.push('E-mail invalido');
        }
        
        // a Senha precisa ter entre 8 e 50 caracteres
        if(this.body.password.length < 8 || this.body.password.length >= 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres!');
        }
    }
    //remove tudo que nao for uma string
    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
                this.body[key] = '';//convertendo para uma string vazia
           }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;