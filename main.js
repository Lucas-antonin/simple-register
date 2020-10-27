const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
const session = require("express-session");
const flash = require("connect-flash");
const registerValidator = require("./rotes/routes")
require("./models/Register")
//Session
app.use(session({
    secret: "ciano",
    resave: true,
    saveUninitialized: true
}))

//Static
app.use(express.static(__dirname + "/public"))

//Config flash
app.use(flash())

//Middleware
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//Config bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('views engine', 'handlebars')

//Config mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/simpleregister",{
    useMongoCliente: true
}).then(()=>{
    console.log("Connected with database")
}).catch((err)=>{
    console.log("Error when trying to connect to the MongoDB")
})


//Rotas
app.use("/cadastro", registerValidator);


app.listen(8081,()=>{
    console.log("Server have been opened")
})