const express=require('express');
const Login=require('../Controllers/Admin/Login')
const route=express();

route.route('/')
.post(Login)

module.exports=route;