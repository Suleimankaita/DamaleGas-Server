const express=require('express');
const GetSale=require('../Controllers/Sales/GetSalesGas')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.get(verify, GetSale)

module.exports=route;