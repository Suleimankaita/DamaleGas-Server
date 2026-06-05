const asynchandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const Admin=require("../../Model/Admin")
const Refreshtoken=asynchandler(async(req,res)=>{

    const token=req.cookies?.jwt;
    console.log(token)
    if(!token)return res.status(400).json({'message':'Token Not found'});

    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,async(err,decode)=>{
        // if(err)return res.status(403).json({'message':'Refreshtoken expired'})
            const found=await Admin.findOne({Username:decode?.UserInfo?.Username}).exec()
        if(!found)return res.status(401).json({'message':'User not found'}) 
            const accesstoken=jwt.sign(
             {
                "UserInfo":{
                    "Username":found.Username,
                    "id":found._id,
                }
             },
             process.env.ACCESS_TOKEN_SECRET,
             {
                expiresIn:'20m'
             }   
            )
            const refreshtoken=jwt.sign(
             {
                "UserInfo":{
                    "Username":found.Username,
                    "id":found._id,
                }
             },
             process.env.REFRESH_TOKEN_SECRET,
             {
                expiresIn:'7d'
             }   
            )
            res.cookie('jwt',refreshtoken,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
                ,maxAge:7*24*60*60*1000})
            res.status(201).json(accesstoken);
    }
)


})

module.exports=Refreshtoken;