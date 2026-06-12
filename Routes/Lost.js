const express=require('express');
const Lost=require('../Controllers/Cylinder/CylinderLost')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.patch(verify, Lost)

module.exports=route;