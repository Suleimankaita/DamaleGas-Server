const express=require('express');
const GetListCylinderById=require('../Controllers/Cylinder/GetCylinderById')
const verify=require('../Middleware/Verify')
const route=express();

route.route('/ById')
.get(verify, GetListCylinderById)

module.exports=route;