const express=require('express');
const UpdateCylinder=require('../Controllers/Cylinder/UpdateCylinder')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.post(verify, UpdateCylinder)

module.exports=route;