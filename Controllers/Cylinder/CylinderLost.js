const Cylinders=require('../../Model/Cylinder')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');

const Lost=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    // const {id}=req.query;
    const { id}= req.body;
    console.log(id)
    const checkfield=checkList({userId,id});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const CylinderFound=await Cylinders.findById(id).populate("Lost");

    if(!CylinderFound)return res.status(400).json({
            status:false,
            message:'Cylinder Not found'
    });

    CylinderFound.Active=false;
    CylinderFound.Lost=CylinderFound.RemainingKg;
    await CylinderFound.save();

    res.status(201).json({
        data:CylinderFound,
        message:`Cylinder lost is ${CylinderFound.Lost?.Lost}Kg`,
        status:true
    })



})

module.exports=Lost