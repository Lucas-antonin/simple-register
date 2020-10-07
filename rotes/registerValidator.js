const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Register")
const register = mongoose.model("registers")
const TestaCPF = require("../public/js/cpfTest")


router.get("/",(req,res)=>{
    res.render("../app/views/index.ejs")
})

router.post("/register", (req,res)=>{

    var erros = []



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

module.exports = router;