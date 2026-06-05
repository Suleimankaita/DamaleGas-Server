const path=require("path")
const express=require('express');

const route=express();

route.get("/",(req,res)=>{
    console.log("Route: /")
    res.sendFile(path.join(__dirname,"..","view","index.html"))
})

module.exports=route