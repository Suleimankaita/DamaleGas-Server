const mongoose=require('mongoose');

const cylinderShecma=new mongoose.Schema({
    name:String,
    Weight:Number,
    RemainingKg:Number,
    Kg:Number,
    Price:Number,
    Profit:{
        type:Number,
        default:0,
    },
    Active:{
        type:Boolean,
        default:true
    },
    SalePrice:Number,
    ActualPrice:Number,
    Expenses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expenses"
    }],
    Loan:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Loan"
    }],
        GasSaller:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CylinderSale'
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