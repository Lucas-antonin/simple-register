const mongoose = require("mongoose");
const register = mongoose.model("registers")
const TestaCPF = require("./public/js/cpfTest")

module.exports = {

register: async(req,res,next)=>{
try{
    var erros = []
    var strCPF = req.body.cpf


    if (TestaCPF(strCPF) == false) {
        erros.push({texto:"Cpf invalido"})
    }


    if (req.body.nome.length < 3) {
        erros.push({texto:"Nome invalido!!"})
    }

    if (erros.length > 0) {
        res.render("../views/index.handlebars", {erros:erros})
    } else {
        const newRegister = {
            nome: req.body.nome,
            cpf: req.body.cpf
        }
        new register(newRegister).save().then(() => {
            req.flash("success_msg", "Registro salvo com sucesso")
            res.redirect("/cadastro")
        }).catch((err) => {
            req.flash("error_msg", "Erro ao salvar o registro")
            res.redirect("/cadastro")
        })
    }
}catch (e){
    next(e)
}
}
}