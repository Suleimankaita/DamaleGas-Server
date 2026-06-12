const Sales=require('../../Model/Sales')
const asynchandler=require('express-async-handler')
const checkList=require('../../utils/AllFieldRequired');

const GetSalesGas=asynchandler(async(req,res)=>{
    const userId=req.id;
    const checkfield=checkList({userId});
    if(!checkfield.success)return res.status(400).json({'message':`${checkfield.field} is Required`});
    const SalesList=await Sales.find().sort({createdAt:-1}).exec();

    if(!SalesList.length)return res.status(200).json({
        status:true,
        data:[],
        message:'No sales found'
    });
    res.status(201).json({
        data:SalesList,
        status:true
    })
})

module.exports=GetSalesGas