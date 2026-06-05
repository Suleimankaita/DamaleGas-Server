const Cylinders=require('../../Model/Cylinder')
const Loan=require('../../Model/Loan')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');
const Admin=require("../../Model/Admin")
const Profile=require('../../Model/Profile')
const ActivityLogs=require('../../Model/ActivityLogs')
const Sale=require('../../Model/Sales')

const AddLoan=asynchandler(async(req,res)=>{
    
    const userId=req.id;
    const {Price,Kg,ActualPrice,SalePrice,Customername,Type,id,Amount}= req.body;
    console.log(id)
    const checkfield=checkList({userId,id,Price,ActualPrice,SalePrice,Customername,Type});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});

    const CylinderFound=await Cylinders.findOne({_id:id}).exec();

    if(!CylinderFound)return res.status(400).json({
            status:false,
            message:'Cylinder Not found'
    });

    const FoundAdmin=await Admin.findById(userId)

    if(!FoundAdmin)return res.status(401).json({
        message:'User Not found',
        status:false
    })
    if(Kg>CylinderFound.RemainingKg&&Type==="Gas"){
        return res.status(400).json({
            message:'Not enough gas in the cylinder',
            status:false
        })
    }

    const logs=await ActivityLogs.create({
        Username:FoundAdmin.Username,
        LogType:Type==="Gas"?"Loan Gas":"Money Loan"
    }) 

    const Loans=await Loan.create({
        SalePrice:SalePrice,
        ActualPrice,    
        name:CylinderFound.name,
        Kg,
        Type,
        Amount:!Amount?SalePrice:Amount
    })
    const Prolfile_id=await Profile.findOne({_id:FoundAdmin.Profile});
    
    if(Prolfile_id&&Type==="Gas"){
            const Sale_id=await Sale.create({
            SalePrice:Price,
            ActualPrice,    
            name:CylinderFound.name,
            Kg
        })

    CylinderFound.RemainingKg=CylinderFound.RemainingKg-Kg

    Prolfile_id.Saller.push(Sale_id);
    await CylinderFound.save()
    await Prolfile_id.save()
}

    res.status(201).json({
        data:Loans,
        status:true
    })



})

module.exports=AddLoan