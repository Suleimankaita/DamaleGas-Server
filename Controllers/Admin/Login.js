const Admin=require("../../Model/Admin");
const jwt=require('jsonwebtoken');
const asynchanler=require('express-async-handler');
const CheckField=require("../../utils/AllFieldRequired")
const bcrypt=require('bcryptjs')

const Login=asynchanler(async(req,res)=>{
    
    const {Username,Password}=req.body;

    const Checklist=CheckField(req.body)
    if(!Checklist.success)return res.status(400).json({'message':'All Field Are required', 'field': Checklist.field});
    
    const found=await Admin.findOne({Username}).populate('Profile').exec();
    if(!found)return res.status(401).json({'message':`User not found`});

    const password=await bcrypt.compare(Password,
    found.Profile.Password)

    const accessToken = jwt.sign(
    {
        UserInfo: {
            Username: found.Username,
            id: found._id
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: '5m'
    }
);

const refreshToken = jwt.sign(
    {
        UserInfo: {
            Username: found.Username,
            id: found._id
        }
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: '7d'
    }
);

res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
});

res.status(200).json({
    accessToken
});
})

module.exports=Login