const express=require('express');
const SaleGas=require('../Controllers/Cylinder/SaleCylinder')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.post(verify, SaleGas)

module.exports=route;