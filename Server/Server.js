require('dotenv').config();
const express=require('express')
const cookie_perser=require('cookie-parser');
const cors=require('cors');
const {Server}=require('socket.io')
const app=express();
const path=require('path')
const connetion=require("../Config/Connection")
const mongoose=require("mongoose");
const PORT=3500; 
const origin=require("../Config/origin")
const multer=require('multer')
const check=require('../Middleware/CheckRoute')
connetion()


app.use(cors(origin))

app.use(express.static(path.join(__dirname,"..","Public")))

app.use(cookie_perser())

app.use(express.json({limit:"20mb"}))

app.use(check)

const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..","Public","img"))
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage:Storage});

// app.use("/",require("../Routes/route"))

app.use('/Auth',require('../Routes/AdminReg'))

app.use('/Auth/Login',require('../Routes/Login'))

app.use('/Auth/Refresh',require('../Routes/RefreshToken'))

app.use('/Api/AddCylinder',require('../Routes/AddNewCylinder'))

app.use('/Api/GetCylinder',require('../Routes/GetCylinderList'))

app.use('/Api/GetCylinder',require('../Routes/GetCylinderById'))

app.use('/Api/UpdateCylinder',require('../Routes/UpdateCylinder'))

app.use('/Api/SaleGas',require('../Routes/SaleGas'))

app.use('/Api/AddLoan',require('../Routes/AddLoan'))

app.use('/Api/UpdateLoan',require('../Routes/UpadateLoan'))

app.use('/Api/GetLoan',require('../Routes/GetLoanData'))


mongoose.connection.once("open",()=>{
    console.log("DB Connected")
    
    const serve=app.listen(PORT,()=>{
        console.log("Server is running on "+PORT)
    })

    new Server(serve,{
            cors:{origin:"*"}
    })
})

