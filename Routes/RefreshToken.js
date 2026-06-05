const express=require('express');
const refreshtoken=require('../Controllers/Tokens/RefreshToken')
const Verify=require('../Middleware/Verify')
const route=express();

route.route('/')
.post(refreshtoken)

module.exports=route;