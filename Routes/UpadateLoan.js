const express=require('express');
const UpdateLoan=require('../Controllers/Loan/UpdateLoad')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.patch(verify, UpdateLoan)

module.exports=route;