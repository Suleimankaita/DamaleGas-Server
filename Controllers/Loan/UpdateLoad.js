const Cylinders=require('../../Model/Cylinder')
const Loan=require('../../Model/Loan')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');
const Admin=require("../../Model/Admin")
const Profile=require('../../Model/Profile')
const ActivityLogs=require('../../Model/ActivityLogs')

const UpdateLoan=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    const {Type,id}= req.body;
    const checkfield=checkList({userId,id,Type});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const foundAdmin=await Admin.findById(userId).populate("Profile");

    if(!foundAdmin)return res.status(401).json({
        message:'User Not found',
        status:false
    })

    const activity=await ActivityLogs.create({
        LogType:Type,
        Username:foundAdmin.Username
    });

    foundAdmin.Profile.ActivityLog.push(activity._id)
     
    await foundAdmin.Profile.save()
    
    const FoundLoan=await Loan.findByIdAndUpdate(id,{$set:{
        Paid:"Paid"
    }})

    res.status(201).json({
        message:`${foundAdmin.Username} Paid the loan `,
        status:true
    })

})

module.exports=UpdateLoan