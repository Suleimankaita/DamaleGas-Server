const express=require('express');
const AddCylinder=require('../Controllers/Cylinder/AddCylinder')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.post(verify, AddCylinder)

module.exports=route;