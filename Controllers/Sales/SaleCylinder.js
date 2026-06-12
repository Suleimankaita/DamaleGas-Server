const Cylinders=require('../../Model/Cylinder')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');
const Admin=require("../../Model/Admin")
const Profile=require('../../Model/Profile')
const ActivityLogs=require('../../Model/ActivityLogs')
const Sale=require('../../Model/Sales')
const SaleCylinder=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    // const {id}=req.query;
    const { Price,Kg,id,cylinderId}= req.body;
    console.log(req.body)
    const checkfield=checkList({userId,cylinderId,Price,Kg});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const CylinderFound=await Cylinders.findOne({_id:cylinderId}).exec();

    if(!CylinderFound)return res.status(400).json({
            status:false,
            message:'Cylinder Not found'
    });

    const FoundAdmin=await Admin.findById(userId)

    if(!FoundAdmin)return res.status(401).json({
        message:'User Not found',
        status:false
    })
    if(Kg>CylinderFound.RemainingKg){
        return res.status(400).json({
            message:`Not enough gas in the cylinder only ${CylinderFound.RemainingKg}Kg remaining`,
            status:false
        })
    }

    const logs=await ActivityLogs.create({
        Username:FoundAdmin.Username,
        LogType:"Sale Gas"
    }) 

    const Sale_id=await Sale.create({
        SalePrice:Price,
        ActualPrice:Math.floor(CylinderFound.Price/CylinderFound.Kg),    
        name:CylinderFound.name,
        Kg:Math.floor(Kg)
    })
    const Prolfile_id=await Profile.findOne({_id:FoundAdmin.Profile});
    console.log(CylinderFound.ActualPrice)
    console.log(CylinderFound.SalePrice)
    CylinderFound.RemainingKg=CylinderFound.RemainingKg-Kg
    const profits=Number(CylinderFound.SalePrice-CylinderFound.ActualPrice)
    CylinderFound.Profit+=profits*Kg

    if(Prolfile_id){

        Prolfile_id.Saller.push(Sale_id);
        CylinderFound.GasSaller.push(Sale_id);
    await CylinderFound.save()
    await Prolfile_id.save()
    }

    res.status(201).json({
        data:CylinderFound,
        status:true
    })



})

module.exports=SaleCylinder