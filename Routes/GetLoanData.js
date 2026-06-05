const express=require('express');
const GetLoan=require('../Controllers/Loan/GetLoan')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.get(verify, GetLoan)

module.exports=route;