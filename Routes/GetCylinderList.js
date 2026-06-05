const express=require('express');
const GetListCylinder=require('../Controllers/Cylinder/GetListCylinder')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.get(verify, GetListCylinder)

module.exports=route;