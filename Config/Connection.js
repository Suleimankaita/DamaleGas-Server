const mongosee = require("mongoose");
const asynchanler=require("express-async-handler");

const connection=asynchanler(async(req,res)=>{

    await mongosee.connect(process.env.DB_URI);
})

module.exports=connection
