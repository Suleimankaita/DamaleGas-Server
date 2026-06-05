const Cylinders=require('../../Model/Cylinder')
const Loan=require('../../Model/Loan')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');

const GetLoan=asynchandler(async(req,res)=>{

    const userId=req.id;
    const CheckFields=checkList({userId});
    if(!CheckFields.success)return res.status(400).json({
        message:`${CheckFields.field} is Requird`,
        status:false
    })

    const AllData=await Loan.find().exec();

    if(!AllData.length)return res.status({
        data:[],
        status:false
    })

    const FilterDataPaid=AllData.filter(res=>res.Paid==="Paid")
    const FilterDataUnPaid=AllData.filter(res=>res.Paid==="Unpaid")

    res.status(201).json({
        data:AllData,
        Paid:FilterDataPaid,
        UnPaid:FilterDataUnPaid,
        status:false
    })

})

module.exports=GetLoan