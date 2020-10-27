const express = require("express");
const router = express.Router();
require("../models/Register")
const controller = require("../controller")


router.get("/",(req,res)=>{
    res.render("../views/index.handlebars")
})

router.post("/register",controller.register)

module.exports = router;