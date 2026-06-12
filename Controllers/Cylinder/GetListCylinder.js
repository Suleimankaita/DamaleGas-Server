const Cylinders=require('../../Model/Cylinder')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');
const GetListCylinder=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    const checkfield=checkList({userId});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const cylindersLists = await Cylinders.find()
  .populate([
    {
      path: "GasSaller",
      model: "CylinderSale",
    },
    {
      path: "Loan",
      model: "Loan",
    },
    {
      path: "Expenses",
      model: "Expenses",
    }
  ])
  .exec();


    if(!cylindersLists.length)return res.status(400).json({
        status:true,
        data:[]
    });
    
    

    
    const UpdateActivate=await Cylinders.updateMany({RemainingKg:0},{Active:false}).exec();

    const ActiveCylinders=cylindersLists.filter(cylinder=>cylinder.Active==true);

    res.status(201).json({
        data:ActiveCylinders,
        AllCylinders:cylindersLists,
        status:true
    })



})

module.exports=GetListCylinder