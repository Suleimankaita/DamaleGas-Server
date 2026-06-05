const express=require('express');
const Registration=require('../Controllers/Admin/Register')
const route=express();

route.route('/')
.post(Registration)

module.exports=route;