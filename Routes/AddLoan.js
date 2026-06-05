const express=require('express');
const Loan=require('../Controllers/Loan/AddLoan')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.post(verify, Loan)

module.exports=route;