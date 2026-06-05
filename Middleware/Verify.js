const asynchandler=require('express-async-handler');
const jwt=require('jsonwebtoken');

const Verify=asynchandler(async(req,res,next)=>{
    
    const auth=req.headers['authorization']||req.headers['Authorization']

    if(!auth?.startsWith("Bearer "))return res.status(403).json({'message':'Invalid token'});

    const token =auth.split(' ')[1];
    try{

        const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        const {Username,id}=decode.UserInfo;
        
        req.user=Username;
        req.id=id
        next()
    }catch(err){
        res.status(400).json({'message':'Token expired'})
    }
})

module.exports=Verify;