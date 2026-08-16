const mongoose=require('mongoose');

const Sales=new mongoose.Schema({
        name:String,
    ActualPrice:Number,
    SalePrice:Number,
    Kg:Number,
    profit:Number,
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

module.exports=mongoose.model('CylinderSale',Sales);