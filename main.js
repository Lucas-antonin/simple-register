const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("./models/Register")

const register = mongoose.model("registers")
//Static
app.use(express.static(__dirname + "/public"))

//Config bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Config mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/simpleregister",{
    useMongoCliente: true
}).then(()=>{
    console.log("Connected with database")
}).catch((err)=>{
    console.log("Error when trying to connect to the MongoDB")
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/app/views/index.html")
})

app.post("/register", (req,res)=>{

    var erros = []


    function TestaCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        // verificando se tem a quantidade certa de caracter e se não tem todos caracteres iguais
        if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
            return false;
        let soma = 0,
            resto;
        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if((resto == 10) || (resto == 11))
            resto = 0;
        if(resto != parseInt(cpf.substring(9, 10)) )
            return false;
        soma = 0;
        for(var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if((resto == 10) || (resto == 11))
            resto = 0;
        if(resto != parseInt(cpf.substring(10, 11) ) )
            return false;
        return true;
    }

    var strCPF = req.body.cpf


     if(TestaCPF(strCPF) == false){
         erros.push("Cpf invalido")
     }


    if(req.body.nome.length < 3){
        erros.push("Nome invalido!!")
    }

    if(erros.length > 0){
        console.log("ERRO")
    }else{
        const newRegister = {
            nome: req.body.nome,
            cpf: req.body.cpf
        }
        new register(newRegister).save().then(()=>{
            console.log("Registro salvo com sucesso")
        }).catch((err)=>{
            console.log("Erro ao salvar o registro")
        })
    }
})






app.listen(8081,()=>{
    console.log("Server have been opened")
})