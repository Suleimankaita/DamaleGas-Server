const Cylinders=require('../../Model/Cylinder')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');
const GetListCylinder=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    const checkfield=checkList({userId});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const cylindersLists=await Cylinders.find().exec();

    if(!cylindersLists.length)return res.status(400).json({
        status:true,
        data:[]
    });

    res.status(201).json({
        data:cylindersLists,
        status:false
    })



})

module.exports=GetListCylinder