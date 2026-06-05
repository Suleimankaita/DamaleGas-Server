const Cylinder=require('../../Model/Cylinder');
const Admin=require('../../Model/Admin');
const ActivtyLogs=require('../../Model/ActivityLogs');
const CheckField=require('../../utils/AllFieldRequired')
const asynchandler=require('express-async-handler')

const AddCylinder=asynchandler(async(req,res)=>{

    const {name,Weight,Kg,Price,SalePrice}=req.body;
    
    const userId=req.id;
    const Checklist=CheckField({name,Weight,Kg,Price,SalePrice})
    if(!Checklist.success)return res.status(400).json({'message':'All Field Are Required', 'field': Checklist.field});
    
    const found=await Admin.findById(userId).lean()
    
    if(!found)return res.status(400).json({'message':'User not found '});

    const Acivity=await ActivtyLogs.create({
      Username:found.Username,
      LogType:`Add new Cylinder`,  
    });

    const CylinderAdd=await Cylinder.create({
    name,
    Price,
    SalePrice,
    Weight,
    Kg,
    RemainingKg:Kg
    })

    res.status(201).json({
      'message':`New Cylinder is Added ${Kg}Kg`,
      'status':false
    })

})

module.exports=AddCylinder;