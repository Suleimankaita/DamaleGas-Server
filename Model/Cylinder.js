const mongoose=require('mongoose');

const cylinderShecma=new mongoose.Schema({
    name:String,
    Weight:Number,
    RemainingKg:Number,
    Kg:Number,
    Price:Number,
    SalePrice:Number,
    Expenses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expenses"
    }],
    Loan:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Loan"
    }],
    Time:{
        type:String,
        default:new Date().toLocaleTimeString()
    },
    Date:{
        type:String,
        default:new Date().toISOString().split('T')[0]
    },
},{
    timestamps:true
})

module.exports=mongoose.model('Cylinder',cylinderShecma);