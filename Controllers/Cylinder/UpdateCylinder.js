const Cylinders=require('../../Model/Cylinder')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');

const UpdateCylinder=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    const {id}=req.query;
    const { name,Price,kg,RemainingKg,Kg}= req.body;
    console.log(id)
    const checkfield=checkList({userId,id});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const CylinderFound=await Cylinders.findByIdAndUpdate(id,{$set:{
        name,
        Price,
        RemainingKg,
        Kg
    }});

    if(!CylinderFound)return res.status(400).json({
            status:false,
            message:'Cylinder Not found'
    });

    res.status(201).json({
        data:CylinderFound,
        status:true
    })



})

module.exports=UpdateCylinder